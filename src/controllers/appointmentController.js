const Appointment = require("../models/appointment");
const appointmentService = require("../services/appointmentService");
module.exports = {
  async create(req, res, next) {
    const { userId, doctorName, specialtyName, appointmentDate, appointmentInitialTime, appointmentFinalTime, reason, status } = req.body;
    try {
      const result = await appointmentService.createAppointment({
        userId,
        doctorName,
        specialtyName,
        appointmentDate,
        appointmentInitialTime,
        appointmentFinalTime,
        reason,
        status,
      });

      res.json({
        msg: "Consulta marcada com sucesso.",
        pdf: `http://localhost:3000/appointment/pdf/${result.secureId}`,
      });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      error.clientMessage = error.message || "Não foi possível marcar a consulta.";
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const { status, date, userId, initialDate, finalDate } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (date) filters.date = date;
      if (userId) filters.userId = userId;
      if (initialDate) filters.initialDate = initialDate;
      if (finalDate) filters.finalDate = finalDate;
      const appointments = await appointmentService.getAllAppointments(filters);
      res.json(appointments);
    } catch (error) {
      error.clientMessage = "Erro ao buscar as consultas.";
      next(error);
    }
  },

  async getAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.getAppointment(req.params.id);
      if (appointment.error) {
        const error = new Error("Consulta não encontrada.");
        error.statusCode = appointment.status;
        throw error;
      }
      res.json(appointment);
    } catch (error) {
      error.clientMessage = "Não foi possível encontrar a consulta.";
      next(error);
    }
  },
  async getAppointmentDetailed(req, res, next) {
    try {
      const appointment = await appointmentService.getAppointmentDetails(req.params.secureId);
      if (appointment.error) {
        const error = new Error("Consulta não encontrada.");
        error.statusCode = appointment.status;
        throw error;
      }
      res.json(appointment);
    } catch (error) {
      error.clientMessage = "Não foi possível encontrar a consulta.";
      next(error);
    }
  },

  async getAppointmentPDF(req, res, next) {
    try {
      const pdfBuffer = await appointmentService.generateAppointmentPDF(req.params.secureId);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=appointment.pdf");
      res.send(pdfBuffer);
    } catch (error) {
      if (!res.headersSent) {
        throw new Error("Não foi possível gerar o PDF da consulta.", 500);
      } else {
        res.end();
        throw new Error("Não foi possível gerar o PDF da consulta.", 500);
      }
    }
  },

  async update(req, res, next) {
    const { doctorId, appointmentDate, appointmentInitialTime, appointmentFinalTime, description, status } = req.body;
    const { id } = req.params;

    try {
      const result = await appointmentService.updateAppointment(id, {
        doctorId,
        specialtyName,
        appointmentDate,
        appointmentInitialTime,
        appointmentFinalTime,
        description,
        status,
      });

      if (result.error) {
        const error = new Error("Consulta não encontrada.");
        error.statusCode = 404;
        throw error;
      }

      res.json({ msg: "Consulta atualizada com sucesso." });
    } catch (error) {
      error.clientMessage = "Não foi possível atualizar a consulta.";
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const result = await appointmentService.deleteAppointment(id);
      if (result.error) {
        const error = new Error("Consulta não encontrada.");
        error.statusCode = 404;
        throw error;
      }

      res.json({ msg: "Consulta deletada com sucesso." });
    } catch (error) {
      error.clientMessage = "Não foi possível deletar a consulta.";
      next(error);
    }
  },
};
