import { Router } from "express";
import { addConsultation} from "../controllers/UserController";
import { Auth } from "../middlewares/auth";

const router = Router()

router.post('/consultation', Auth.private, addConsultation)

export default router

