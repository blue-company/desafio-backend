const express = require('express')
const router = express.Router();
const userController = require("./controllers/userController.js");
const protect  = require('./middlewares/authMiddleware.js');
const appointmentController = require('./controllers/appointmentController.js');



// Auth
router.post('/api/auth/login', userController.login);


//user
router.get('/api/',userController.getUsers);
router.post('/api/register', userController.createUser);
router.put('/api/:id', userController.updateUser);
router.delete('/api/:id', userController.deleteUser);

//appointment
router.post('/api/appointments', protect, appointmentController.createAppointment);
router.get('/api/appointments', protect, appointmentController.getAppointments);
router.get('/api/appointments/:id', protect, appointmentController.getAppointmentById);
router.put('/api/appointments/:id', protect, appointmentController.updateAppointment);

// router.delete('/api/appointments', protect, appointmentController.createAppointment);

// Rota para baixar o PDF da consulta
// abrir uma aba mostrando o pdf e disponiilizando para salvar
router.get('/api/pdfs/:idconsulta',protect, appointmentController.getPdf)

module.exports  = router;