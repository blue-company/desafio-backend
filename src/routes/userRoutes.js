const express = require("express");
const UserController = require("../controllers/userController.js");
const auth = require("../middlewares/auth.js");

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: User (Autenticação)
 *   description: Aqui você realiza as operações relacionadas do usuário.
 *
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Aqui você realiza as operações GET, UPDATE e DELETE relacionadas ao usuário.
 *
 */

routes.post("/register", UserController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [User (Autenticação)]
 *     summary: Realiza o login do usuário.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuarioteste
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Login bem-sucedido.
 *                 token:
 *                   type: string
 *       400:
 *         description: Solicitação inválida.
 *       404:
 *        description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
routes.post("/login", UserController.login);

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User (Autenticação)]
 *     security:
 *       - BearerAuth: []
 *     summary: Lista todos os usuários cadastrados.
 *     responses:
 *       200:
 *         description: Uma lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno do servidor.
 */
routes.get("/user", UserController.getAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     summary: Obtém um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Acesso negado.
 *       500:
 *         description: Erro interno do servidor.
 */
routes.get("/user/:id", auth, UserController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     summary: Atualiza um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *               active:
 *                 type: boolean
 *               birthDate:
 *                 type: string
 *                 format: date
 *               sex:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Usuário com o id 1 atualizado com sucesso!
 *       400:
 *         description: Solicitação inválida.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 *       409:
 *        description: Erro de conflito.
 *       500:
 *         description: Erro interno do servidor.
 */
routes.put("/user/:id", auth, UserController.update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     summary: Deleta um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Usuário com o id 1 deletado com sucesso!
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
routes.delete("/user/:id", UserController.delete);

module.exports = routes;
