
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();


module.exports =  async function protect (req, res, next) {
    
  const authHeader = req.headers["authorization"];
  
  if (authHeader == undefined || authHeader == '') return res.status(401).json({ msg: "Acesso negado!, token undefined " });
  

  try {
    const token = authHeader.replace("Bearer ", "")
    const secret = process.env.JWT_SECRET;

    const decode = jwt.verify(token, secret);

    req.user = decode.id
    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
 
};
