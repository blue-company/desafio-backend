const express = require('express')
const router = express.Router();




router.get('/',(req, res) => {
    return res.send("deu certo")
})

module.exports  = router;