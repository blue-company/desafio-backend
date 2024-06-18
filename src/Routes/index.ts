import { Router, Request, Response } from "express";
import userRouter from './userRoute'
import loginRouter from "./login";
import consultRouter from "./consultRoute";

const router = Router();

router.get('/', (_req: Request, res: Response)=>{res.send('Home')});

router.use('/login', loginRouter)
router.use('/users', userRouter)
router.use('/consult', consultRouter)

export default router;