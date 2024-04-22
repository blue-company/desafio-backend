const userService = require("../services/userService");
const appointmentService = require("../services/appointmentService");
const userValidate = require("../validators/userValidator");

module.exports = {
  async register(req, res, next) {
    try {
      const { name, username, password, role, birthDate, sex } = req.body;
      const requiredFields = ["name", "username", "password", "birthDate"];
      userValidate.validateRegister({ name, username, password, birthDate, sex }, requiredFields);
      const user = await userService.registerUser(req.body);
      if (user) {
        const token = await userService.authenticateUser(req.body.username, req.body.password);
        return res.status(200).json({
          msg: `Usuário registrado com sucesso. Use o token para acessar as rotas protegidas.`,
          user: { id: user.id, username: user.username },
          token: token,
        });
      } else {
        throw new Error("Registro de usuário não foi concluído.");
      }
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    const { username, userRole } = req.headers;
    const { name, active } = req.query;
    try {
      const filters = { name, active };
      const users = await userService.findAllUsers({ username, userRole, filters });
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const user = await userService.findUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { name, username, type, active, birthDate, sex } = req.body;
    try {
      await userService.updateUser(id, { name, username, type, active, birthDate, sex });
      return res.status(200).json({ msg: `Usuário com o id ${id} atualizado com sucesso!` });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await userService.deleteUser(id);
      return res.status(200).json({ msg: `Usuário com o id ${id} deletado com sucesso!` });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      userValidate.validateLogin({ username, password });
      const token = await userService.authenticateUser(username, password);
      return res.status(200).json({ msg: "Login bem-sucedido.", token: token });
    } catch (error) {
      next(error);
    }
  },
};
