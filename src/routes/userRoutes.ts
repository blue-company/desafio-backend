import { Router } from "express";
import { scheduleConsultationController, getConsultationsController, getConsultationController, updateConsultationController, cancelConsultationController } from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, scheduleConsultationController)
router.get('/consultation/:token', Auth.private, getConsultationController)
router.put('/consultation/:id', Auth.private, updateConsultationController)
router.delete('/consultation/:id', Auth.private, cancelConsultationController)
router.get('/consultations', Auth.private, getConsultationsController)


export default router

