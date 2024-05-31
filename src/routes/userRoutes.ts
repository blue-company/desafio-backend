import { Router } from "express";
import { scheduleConsultationController, getConsultations, getConsultation, updateConsultationController} from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, scheduleConsultationController)
router.get('/consultation/:token', Auth.private, getConsultation)
router.put('/consultation/:id', Auth.private, updateConsultationController)
router.get('/consultations', Auth.private, getConsultations)

export default router

