const Appointment = require("../models/appointment");
const User = require("../models/user");

const userService = require("./userService");
const appointmentValidator = require("../validators/appointmentValidator");
const { Op } = require("sequelize");

const { generatePDF } = require("../utils/pdf/pdfGenerator");
const { generateEncryptedId } = require("../utils/encryptionUtils");
const { format } = require("sequelize/lib/utils");

class AppointmentService {
  async createAppointment({ userId, doctorName, specialtyName, appointmentDate, appointmentInitialTime, appointmentFinalTime, reason, status }) {
    let user = User.findByPk(userId);
    if (!user) {
      const error = new Error("Usuário não encontrado.");
      error.statusCode = 404;
      throw error;
    }
    if (!appointmentValidator.validateStatus(status)) {
      const error = new Error("Status inválido fornecido.");
      error.statusCode = 400;
      throw error;
    }
    console.log({
      secureId: generateEncryptedId(),
      userId,
      doctorName,
      specialtyName,
      appointmentDate,
      appointmentInitialTime,
      appointmentFinalTime,
      status: appointmentValidator.formatStatus(status),
      reason,
    });
    const appointment = await Appointment.create({
      secureId: generateEncryptedId(),
      userId,
      doctorName,
      specialtyName,
      appointmentDate,
      appointmentInitialTime,
      appointmentFinalTime,
      status: appointmentValidator.formatStatus(status),
      reason,
    });
    if (!appointment) {
      const error = new Error("Falha ao criar a consulta.");
      error.statusCode = 500;
      throw error;
    }
    return appointment;
  }

  async getAllAppointments(filters = {}) {
    const { userId, status, initialDate, finalDate } = filters;
    const whereClause = {};
    if (userId) {
      whereClause.userId = userId;
    }

    if (status) {
      whereClause.status = appointmentValidator.formatStatus(status);
    }

    if (initialDate && finalDate) {
      whereClause.appointmentDate = {
        [Op.between]: [initialDate, finalDate],
      };
    } else if (Object.keys(filters).length === 0) {
    } else {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      whereClause.appointmentDate = {
        [Op.between]: [today, nextWeek],
      };
    }
    const appointments = await Appointment.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      attributes: ["id", "doctorName", "specialtyName", "appointmentDate", "appointmentInitialTime", "appointmentFinalTime", "status"],
    });
    const detailedAppointments = [];
    for (let app of appointments) {
      const detailedAppointment = await this.getAppointment(app.id);
      detailedAppointments.push(detailedAppointment);
    }
    return detailedAppointments;
  }

  async getAppointment(id) {
    const appointment = await Appointment.findOne({
      where: { id },
      attributes: ["id", "userId", "doctorName", "specialtyName", "appointmentDate", "appointmentInitialTime", "appointmentFinalTime", "status"],
    });
    if (!appointment) {
      throw new Error("Consulta não encontrada.");
    }
    const user = await User.findByPk(appointment.userId, {
      attributes: ["id", "name", "username", "role", "birthDate", "sex"],
    });
    const doctor = { fullName: appointment.doctorName, specialty: appointment.specialtyName };
    return {
      ...appointment.get(),
      status: appointmentValidator.getStatusString(appointment.status),
      user,
      doctor,
    };
  }

  async getAppointmentDetails(secureId) {
    const appointment = await Appointment.findOne({ where: { secureId } });
    if (!appointment) {
      throw new Error("Consulta não encontrada.");
    }
    const user = await User.findByPk(appointment.userId, {
      attributes: ["id", "name", "username", "role", "birthDate", "sex"],
    });
    const doctor = { name: appointment.doctorName, specialtyName: appointment.specialtyName };
    return {
      ...appointment.get(),
      status: appointmentValidator.getStatusString(appointment.status),
      user,
      doctor,
    };
  }

  async updateAppointment(id, { doctorName, specialtyName, appointmentDate, appointmentInitialTime, appointmentFinalTime, reason, status }) {
    const updated = await Appointment.update(
      {
        doctorName,
        specialtyName,
        appointmentDate,
        appointmentInitialTime,
        appointmentFinalTime,
        reason,
        status,
      },
      {
        where: { id },
      }
    );
    if (!updated) {
      throw new Error("Consulta não encontrada ou não foi possível atualizar.");
    }
    return this.getAppointmentDetails(secureId);
  }

  async deleteAppointment(id) {
    const deleted = await Appointment.destroy({
      where: { id },
    });
    if (!deleted) {
      throw new Error("Consulta não encontrada ou não foi possível deletar.");
    }
    return { message: "Consulta deletada com sucesso." };
  }

  async generateAppointmentPDF(secureId) {
    const appointment = await this.getAppointmentDetails(secureId);
    if (!appointment) {
      throw new Error("Consulta não encontrada para geração de PDF.");
    }
    const data = {
      ...appointment,
    };
    return generatePDF(data);
  }
}

module.exports = new AppointmentService();
