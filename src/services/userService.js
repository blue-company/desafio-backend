const User = require("../models/user");
const CustomError = require("../utils/customError");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const appointmentService = require("../services/appointmentService");
const Op = require("sequelize").Op;
const userValidator = require("../validators/userValidator");

const formatDate = require("../utils/formatDate");

class UserService {
  async registerUser(details) {
    const { name, username, password, role = "USER", birthDate = null, sex } = details;
    if (username && (await this.userExistsByUsername(username))) {
      const error = new CustomError("Usuário com esse username já está cadastrado.");
      error.statusCode = 409;
      throw error;
    }
    userValidator.validateRegister(details);
    const hashedPassword = await argon2.hash(password);
    return await User.create({
      name: name,
      username: username,
      password: hashedPassword,
      role: role,
      active: true,
      birthDate: formatDate(birthDate),
      sex,
    });
  }
  async formatUser(user) {
    const formattedUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      active: user.active,
      birthDate: user.birthDate,
      sex: user.sex,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return formattedUser;
  }

  async findUserByUsername(username) {
    return await User.findOne({ where: { username: username } });
  }

  async userExistsByUsername(username) {
    const user = await User.findOne({ where: { username: username } });
    return user !== null;
  }

  async findUserById(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const error = new CustomError(`Usuário com o id ${id} não encontrado.`);
      error.statusCode = 404;
      throw error;
    }
    return this.formatUser(user);
  }

  async updateUser(id, details) {
    const { name, username, active, birthDate, sex, role } = details;
    const user = await this.findUserById(id);
    if (!user) {
      const error = new CustomError(`Usuário com o id ${id} não encontrado.`);
      error.statusCode = 404;
      throw error;
    }
    if (username && user.username !== username) {
      const userExists = await this.findUserByUsername(username);
      if (userExists) {
        const error = new CustomError(`Esse username pertence a outro usuário. Tente novamente.`);
        error.statusCode = 409;
        throw error;
      }
    }
    const updatedDetails = {
      name: name !== undefined ? name : user.name,
      username: username !== undefined ? username : user.username,
      active: active !== undefined ? active : user.active,
      birthDate: birthDate !== undefined ? formatDate(birthDate) : user.birthDate,
      sex: sex !== undefined ? sex : user.sex,
      role: role !== undefined ? role : user.role,
    };
    userValidator.validateUpdate(updatedDetails);
    return await User.update(details, { where: { id } });
  }

  async findUserAppointments(userId) {
    const appointments = await appointmentService.getAllAppointments({ userId });
    return appointments;
  }

  async userHasAppointments(userId) {
    const appointments = await appointmentService.getAllAppointments({ userId });
    return appointments && appointments.length > 0;
  }

  async deleteUser(id) {
    const user = await this.findUserById(id);
    if (!user) {
      const error = new CustomError(`Usuário com o id ${id} não encontrado.`);
      error.statusCode = 404;
      throw error;
    }
    if (!(await this.userHasAppointments(id))) {
      return await User.destroy({ where: { id } });
    }
    const error = new CustomError("Usuário possui consultas relacionadas em seu nome, não pode ser excluído.");
    error.statusCode = 409;
    throw error;
  }

  async authenticateUser(username, password) {
    const user = await this.findUserByUsername(username);
    if (!user) {
      const error = new CustomError("Usuário com id ${user.id} não existe.");
      error.statusCode = 404;
      throw error;
    }
    if (!(await argon2.verify(user.password, password))) {
      const error = new CustomError("Credenciais inválidas. Tente novamente.");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user.id, username: user.username, userRole: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  async getUserRole(id) {
    const user = await this.findUserById(id);
    return user ? user.role : null;
  }

  async findAllUsers(username, userRole, filters = {}, properties = {}) {
    const { active, name } = filters;
    const whereClause = {};
    if (active) {
      whereClause.active = active;
    } else {
      whereClause.active = true;
    }
    if (name) {
      whereClause.name = { [Op.like]: "%" + name.toUpperCase() + "%" };
    }
    const user = User.findAll({
      where: whereClause,
      attributes: ["id", "name", "username", "password", "role", "active", "birthDate", "sex"],
    });
    return user;
  }

  async getUserByToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return await this.findUserById(decoded.userId);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new UserService();
