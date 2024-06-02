import { Router } from "express";
import { scheduleConsultationController, getConsultationsController, getConsultationController, updateConsultationController, cancelConsultationController, getDoctorsController } from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, scheduleConsultationController)
router.get('/consultation/:token', getConsultationController)
router.put('/consultation/:id', Auth.private, updateConsultationController)
router.delete('/consultation/:id', Auth.private, cancelConsultationController)
router.get('/consultations', Auth.private, getConsultationsController)
router.get('/doctors', Auth.private, getDoctorsController)

export default router

