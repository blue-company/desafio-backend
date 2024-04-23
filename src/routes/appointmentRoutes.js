const express = require("express");
const appointmentController = require("../controllers/appointmentController.js");

const routes = express.Router();

routes.get("/appointment", appointmentController.getAll);
routes.get("/appointment/:id", appointmentController.getAppointment);
routes.get("/appointment/:secureId", appointmentController.getAppointmentDetailed);
routes.get("/appointment/pdf/:secureId", appointmentController.getAppointmentPDF);
routes.post("/appointment", appointmentController.create);
routes.put("/appointment/:id", appointmentController.update);
routes.delete("/appointment/:id", appointmentController.delete);

module.exports = routes;
