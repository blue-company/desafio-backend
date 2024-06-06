const Appointment = require('../models/appointmentModel.js');
const generatePdf = require('../utils/generatepdf');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel.js')

module.exports = {
  async createAppointment(req, res) {
    const { date, time, address, doctor, description } = req.body;
    console.log(req.user, date, time, address, doctor, description)
    const user_id = req.user;
    try {
      const appointment = await Appointment.create({
        date,
        time,
        address,
        doctor,
        description,
        user_id
      });

      const appointments = await Appointment.findOne({
        where: { id: appointment.id },
        include: [{ model: User, as: 'user', where: { id: req.user } }] 
      });
      const pdfPath = path.join(__dirname, `../pdfs/consulta${appointment.id}.pdf`);

      
      console.log("apointtttttments", appointments)

      await generatePdf(appointments, pdfPath);

      res.status(201).json({ appointment, pdfPath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar consulta' });
    }
  },

  // Obter todas as consultas de um usuário
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

  // Obter uma consulta por ID
  async getAppointmentById(req, res) {

console.log("aquiiiiiiiiiii")
    try {
      const appointment = await Appointment.findOne({ where: { id: req.params.id, user_id: req.user }  });
      
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

  async getPdf(req, res){
    const id = req.params.idconsulta;
    const pdfPath = path.join(__dirname, `../pdfs/consulta${id}.pdf`);
    // Verifica se o arquivo existe
    if (fs.existsSync(pdfPath)) {
      return res.status(201).download(pdfPath, `consulta${id}.pdf`);
    } else {
  
      return res.status(404).send('Arquivo não encontrado');
    }
    },
   
  async updateAppointment(req, res) {
  const { id } = req.params;
  const { date, time, address , doctor, description, } = req.body;

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
  }
  
}