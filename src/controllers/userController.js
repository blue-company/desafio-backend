const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
const User = require("../models/userModel.js")

module.exports = {

  // Login de usuário
 async  login(req, res) {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
},

  async getUsers(req, res) {
    try {

      // Verifica se o usuário  existe
      const userExist = await User.findAll();
      if (userExist) {
        res.status(201).json({ userExist });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verifica se o usuário já existe
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Cria um novo usuário
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async updateUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const { id } = req.params;
       await User.update({name, email, password },{ where: { id }});
       
        return res.status(201).json({ message: 'Usuario atualizado com sucesso' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },


  async deleteUser(req, res) {
    try {
      const { id } = req.params;
       await User.destroy({ where: { id }});
       
        return res.status(200).json({ message: 'Usuario Deletado com sucesso' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

}