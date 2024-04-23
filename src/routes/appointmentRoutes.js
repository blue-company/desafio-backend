const express = require("express");
const appointmentController = require("../controllers/appointmentController.js");
const auth = require("../middlewares/auth.js");

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Aqui você realiza as operações de GET, UPDATE E DELETE da rota de Marcação de Consultas.
 *
 */

/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Cria uma nova marcação de consulta
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               doctorName:
 *                 type: string
 *                 example: "Dr. João Silva"
 *               specialtyName:
 *                 type: string
 *                 example: "Cardiologia"
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               appointmentInitialTime:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               appointmentFinalTime:
 *                 type: string
 *                 format: time
 *                 example: "10:00:00"
 *               reason:
 *                 type: string
 *                 example: "Dor no peito e fadiga constante"
 *               status:
 *                 type: string
 *                 description: Status da consulta, podendo ser "MARCADA", "CONCLUÍDA" ou "CANCELADA"
 *                 example: "MARCADA"
 *             required:
 *               - userId
 *               - doctorName
 *               - specialtyName
 *               - appointmentDate
 *               - appointmentInitialTime
 *               - appointmentFinalTime
 *               - reason
 *               - status
 *     responses:
 *       200:
 *         description: Marcação de consulta criada com sucesso, retorna o link para o PDF da consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Consulta marcada com sucesso."
 *                 pdf:
 *                   type: string
 *                   example: "http://localhost:3000/appointment/pdf/062e3b59...."
 *
 *       400:
 *         description: Erro ao criar a marcação de consulta
 */
routes.post("/appointment", auth, appointmentController.create);

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: Obtém todas as marcações de consulta
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna todas as marcações de consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *
 *       500:
 *         description: Erro ao obter as marcações de consulta
 */
routes.get("/appointment", auth, appointmentController.getAll);

/**
 * @swagger
 * /appointment/{id}:
 *   get:
 *     summary: Obtém uma marcação de consulta pelo ID
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marcação de consulta
 *     responses:
 *       200:
 *         description: Retorna a marcação de consulta correspondente ao ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *
 *       404:
 *         description: Marcação de consulta não encontrada
 */
routes.get("/appointment/:id", auth, appointmentController.getAppointment);

/**
 * @swagger
 * /appointment/{secureId}:
 *   get:
 *     summary: Obtém uma marcação de consulta detalhada pelo secureId
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: secureId
 *         schema:
 *           type: string
 *         required: true
 *         description: secureId da marcação de consulta
 *     responses:
 *       200:
 *         description: Retorna a marcação de consulta detalhada correspondente ao secureId fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *
 *       404:
 *         description: Marcação de consulta não encontrada
 */
routes.get("/appointment/:secureId", appointmentController.getAppointmentDetailed);

/**
 * @swagger
 * /appointment/pdf/{secureId}:
 *   get:
 *     summary: Obtém o PDF de uma marcação de consulta pelo secureId
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: secureId
 *         schema:
 *           type: string
 *         required: true
 *         description: secureId da marcação de consulta
 *     responses:
 *       200:
 *         description: Retorna o PDF da marcação de consulta correspondente ao secureId fornecido
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       404:
 *         description: PDF da marcação de consulta não encontrado
 */
routes.get("/appointment/pdf/:secureId", auth, appointmentController.getAppointmentPDF);

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     summary: Atualiza uma marcação de consulta pelo ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marcação de consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Marcação de consulta atualizada com sucesso
 *
 *       404:
 *         description: Marcação de consulta não encontrada
 */
routes.put("/appointment/:id", appointmentController.update);

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Deleta uma marcação de consulta pelo ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marcação de consulta
 *     responses:
 *       200:
 *         description: Marcação de consulta deletada com sucesso
 *
 *       404:
 *         description: Marcação de consulta não encontrada
 */
routes.delete("/appointment/:id", appointmentController.delete);

module.exports = routes;
