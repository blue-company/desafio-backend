import { Router } from "express";
import { scheduleConsultation, getConsultations, getConsultation} from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, scheduleConsultation)
router.get('/consultation/:token', Auth.private, getConsultation)
router.get('/consultations', Auth.private, getConsultations)

export default router

