const express = require('express')
const router = express.Router();
const userController = require("./controllers/userController.js")



router.get('/',(req, res) => {
    return res.send("deu certo")
})


router.get('/api/', userController.getUsers);
router.post('/api/register', userController.createUser);
router.put('/api/:id', userController.updateUser);



module.exports  = router;