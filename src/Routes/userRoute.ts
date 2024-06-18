import { Router, Request, Response  } from "express";
import { UserController } from "../Controller/User";
import { UserModel } from "../Models/User";
import { verifyToken } from "../middleware/auth";

const userRouter = Router();
const userModel = new UserModel()
const userController = new UserController(userModel)

userRouter.post('/', (req: Request, res: Response) => userController.createUser(req, res))
userRouter.get('/', verifyToken, (req: Request, res: Response) => userController.finduser(req, res))

export default userRouter