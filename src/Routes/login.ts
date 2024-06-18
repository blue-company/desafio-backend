import { Router, Request, Response  } from "express";
import { AuthController } from "../middleware/auth";
import { UserModel } from "../Models/User";

const loginRouter = Router();
const userModel = new UserModel();
const auth = new AuthController(userModel);

loginRouter.post('/',(req: Request, res: Response) => auth.loginUser(req, res))

export default loginRouter;