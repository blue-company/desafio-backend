import express from "express";
import { TokenManager } from "../utils/TokenManager";
import { MedicalAppointService } from "../service/MedicalAppointService";
import { MedicalAppointController } from "../controller/MedicalAppointController";
import { MedicalAppointRepository } from "../repository/MedicalAppointRepository";
import { UserRepository } from "@src/repository/UserRepository";
import { IdGerator } from "@src/utils/IdGerator";

export const MedicalAppointRoutes = express.Router();

const medicalAppointController = new MedicalAppointController(
  new MedicalAppointService(
    new MedicalAppointRepository(),
    new UserRepository(),
    new TokenManager(),
    new IdGerator()
  )
);

MedicalAppointRoutes.post("/get", medicalAppointController.getAppoint);
MedicalAppointRoutes.post("/create", medicalAppointController.create);
