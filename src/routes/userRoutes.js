const express = require("express");
const UserController = require("../controllers/userController.js");
const auth = require("../middlewares/auth.js");

const routes = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     description: Obter todos os usuários
 *     responses:
 *       200:
 *         description: Sucesso
 *
 * /user/{id}:
 *   get:
 *     description: Obter usuário por id
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *
 *   put:
 *     description: Atualizar usuário por id
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *
 *   delete:
 *     description: Deletar usuário por id
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *
 * /login:
 *   post:
 *     description: Login do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *
 * /register:
 *   post:
 *     description: Registrar usuário
 *     responses:
 *       200:
 *         description: Sucesso
 */
routes.get("/user", UserController.getAll);
routes.get("/user/:id", UserController.getUserById);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);
routes.post("/login", UserController.login);
routes.post("/register", UserController.register);

module.exports = routes;
