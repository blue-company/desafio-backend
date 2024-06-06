const Appointment = require('../models/appointmentModel.js');
const generatePdf = require('../utils/generatepdf');
const path = require('path');
const User = require('../models/userModel.js')

module.exports = {
    async createAppointment(req, res) {
        const { date, time, address, doctor, description } = req.body;
        console.log(req.user, date, time, address, doctor, description )
        const user_id = req.user;
        try {
            const appointment = await Appointment.create({
                date,
                time, 
                address, 
                doctor,
                description,
                user_id
            } );
            
            const pdfPath = path.join(__dirname, `../pdfs/consulta${req.user}.pdf`);
            console.log(pdfPath)

            const appointments = await Appointment.findOne({
                where: { date },
                include: [{ model: User, as: 'user', where: { id: 2 } }] // Inclui os dados do usuário com id 2 associado a este compromisso
            });
        
            console.log("apointtttttments", appointments)
            
            await generatePdf(appointments, pdfPath);
            
            res.status(201).json({ appointment, pdfPath });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao criar compromisso' });
        }
    },

    // Obter todos os compromissos de um usuário
  async getAppointments(req, res){
    try {
      const user_id = req.user;
      const appointments = await Appointment.findAll({
        where: { user_id },
        include: [{ model: User, as: 'user' }] // Inclui os dados do usuário associado a cada consulta
    });
  
      res.status(200).json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao obter compromissos' });
    }
  }
}
