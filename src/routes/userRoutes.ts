import { Router } from "express";
import { scheduleConsultation, getConsultations} from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, scheduleConsultation)
router.get('/consultations', Auth.private, getConsultations)

export default router

