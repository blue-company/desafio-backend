const router = require('express').Router();
const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');
const validateUser = require('../middlewares/validateUser');

router.post('/', validateUser, userController.create);

router.post('/login', validateLogin, userController.login);

module.exports = router;
