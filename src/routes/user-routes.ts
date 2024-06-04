import { Router } from "express";
import { AuthenticateUserController } from "../controllers/user/authenticate-user-controller";
import { CreateUserController } from "../controllers/user/create-user-controller";

const userRoutes = Router();

const createUser = new CreateUserController();
const authenticateUser = new AuthenticateUserController();

userRoutes.post("/", createUser.handle);
userRoutes.post("/login", authenticateUser.handle);

export { userRoutes };
