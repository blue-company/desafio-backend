const Appointment = require('../models/appointmentModel.js');
const generatePdf = require('../utils/generatepdf');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel.js')

module.exports = {
  
  // cria consulta
  async createAppointment(req, res) {
    const { date, time, address, doctor, description } = req.body;
    const user_id = req.user;
  
    // Combine date and time into a single Date object for comparison
    const appointmentDateTime = new Date(`${date}T${time}`);
  
    try {
      // Verifique se já existe uma consulta no mesmo horário para o usuário
      const existingAppointment = await Appointment.findOne({
        where: {
          user_id,
          date,
          time
        }
      });
  
      if (existingAppointment) {
        return res.status(400).json({ message: 'Você já tem uma consulta marcada para este horário. Por favor, escolha outro horário.' });
      }
  
      // Criação da nova consulta
      const appointment = await Appointment.create({
        date,
        time,
        address,
        doctor,
        description,
        user_id
      });
  
      // Buscar a consulta criada junto com o usuário
      const appointments = await Appointment.findOne({
        where: { id: appointment.id },
        include: [{ model: User, as: 'user', where: { id: req.user } }]
      });
  
      // Gerar PDF da consulta
      const pdfPath = path.join(__dirname, `../pdfs/consulta${appointment.id}.pdf`);
      await generatePdf(appointments, pdfPath);
  
      // Enviar resposta de sucesso
      res.status(201).json({ message: 'Consulta criada com sucesso', appointment });
    } catch (err) {
      res.status(500).json({ erro: err.message, message: 'Erro ao criar consulta' });
    }
  },

  // Obtem todas as consultas de um usuário
  async getAppointments(req, res) {
    try {
      const user_id = req.user;
      const appointments = await Appointment.findAll({
        where: { user_id },
        include: [{ model: User, as: 'user' }] // Inclui os dados do usuário associado a cada consulta
      });

      res.status(200).json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao obter consulta' });
    }
  },

  // Obtem uma consulta por ID
  async getAppointmentById(req, res) {
    try {
      const appointment = await Appointment.findOne({ where: { id: req.params.id, user_id: req.user } });

      if (appointment == null || appointment == undefined || appointment == '') {
        return res.status(400).json({ message: 'O usuario nao possui consultas' });
      }

      if (!appointment) {
        return res.status(404).json({ message: 'consulta não encontrada ou não autorizada' });
      }


      res.status(200).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao obter consulta' });
    }
  },

  // Obtem pdf
  async getPdf(req, res) {
    const id = req.params.idconsulta;
    const pdfPath = path.join(__dirname, `../pdfs/consulta${id}.pdf`);
    // Verifica se o arquivo existe
    if (fs.existsSync(pdfPath)) {
      return res.status(201).download(pdfPath, `consulta${id}.pdf`);
    } else {

      return res.status(404).send('Arquivo não encontrado');
    }
  },

  // Altera consulta
  async updateAppointment(req, res) {
    const { id } = req.params;
    const { date, time, address, doctor, description, } = req.body;

    try {
      const appointment = await Appointment.findOne({ where: { id, user_id: req.user } });

      if (!appointment) {
        return res.status(404).json({ message: 'Compromisso não encontrado ou não autorizado' });
      }

      // atualiza campos
      appointment.date = date || appointment.date;
      appointment.time = time || appointment.time;
      appointment.address = address || address.date;
      appointment.doctor = doctor || doctor.date;
      appointment.description = description || appointment.description;

      await appointment.save();

      res.status(200).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar compromisso' });
    }
  },

  // exclui consulta
  async deleteAppointment(req, res) {
    const { id } = req.params;

    try {
      const appointment = await Appointment.findOne({ where: { id, user_id: req.user } });

      if (!appointment) {
        return res.status(404).json({ message: 'Consulta não encontrada ou não autorizada' });
      }

      await appointment.destroy();

      res.status(200).json({ message: 'consulta removida com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir consulta' });
    }
  }
}