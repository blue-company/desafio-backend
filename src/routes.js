const express = require('express')
const router = express.Router();
const userController = require("./controllers/userController.js");
const protect  = require('./middlewares/authMiddleware.js');
const appointmentController = require('./controllers/appointmentController.js');



router.get('/',(req, res) => {
    return res.send("deu certo")
})

// Auth
router.post('/api/auth/login', userController.login);

//user
router.get('/api/', protect , userController.getUsers);
router.post('/api/register', userController.createUser);
router.put('/api/:id', userController.updateUser);
router.delete('/api/:id', userController.deleteUser);

//appointment
router.post('/api/appointments', protect, appointmentController.createAppointment);
router.get('/api/appointments', protect, appointmentController.getAppointments);

// router.put('/api/appointments', protect, appointmentController.createAppointment);
// router.delete('/api/appointments', protect, appointmentController.createAppointment);


module.exports  = router;