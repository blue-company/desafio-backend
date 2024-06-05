const express = require('express')
const router = express.Router();
const userController = require("./controllers/userController.js");
const protect  = require('./middlewares/authMiddleware.js');



router.get('/',(req, res) => {
    return res.send("deu certo")
})


router.post('/api/auth/login', userController.login);

router.get('/api/', protect , userController.getUsers);
router.post('/api/register', userController.createUser);
router.put('/api/:id', userController.updateUser);
router.delete('/api/:id', userController.deleteUser);


module.exports  = router;