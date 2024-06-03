import express from "express";
import { TokenManager } from "../utils/TokenManager";
import { MedicalAppointService } from "../service/MedicalAppointService";
import { MedicalAppointController } from "../controller/MedicalAppointController";
import { MedicalAppointRepository } from "../repository/MedicalAppointRepository";
import { UserRepository } from "../repository/UserRepository";
import { IdGerator } from "../utils/IdGerator";
import { PDFGenarator } from "../utils/PDFGenarator";

export const MedicalAppointRoutes = express.Router();

const medicalAppointController = new MedicalAppointController(
  new MedicalAppointService(
    new MedicalAppointRepository(),
    new UserRepository(),
    new TokenManager(),
    new IdGerator(),
    new PDFGenarator
  )
);

MedicalAppointRoutes.get("/get", medicalAppointController.getAppoint);
MedicalAppointRoutes.get("/appoint/:idUser&:idAppoint", medicalAppointController.getAppointByIdUser);
MedicalAppointRoutes.post("/create", medicalAppointController.create);
MedicalAppointRoutes.put("/edit/:id", medicalAppointController.edit);
MedicalAppointRoutes.put("/cancel/:id", medicalAppointController.cancel)
