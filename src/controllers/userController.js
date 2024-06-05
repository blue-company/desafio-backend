const bcrypt = require('bcrypt')


const User = require("../models/userModel.js")

module.exports = {


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
}