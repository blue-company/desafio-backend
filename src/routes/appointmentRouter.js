const router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');
const validateAppointment = require('../middlewares/validateAppointment');
const validateAuthentication = require('../middlewares/validateAuthentication');

router.post('/', validateAuthentication, validateAppointment, appointmentController.create);

router.get('/:token', validateAuthentication, appointmentController.getAppointment);

router.put('/:id', validateAuthentication, validateAppointment, appointmentController.update);

router.delete('/:id', validateAuthentication, appointmentController.cancel);

module.exports = router;
