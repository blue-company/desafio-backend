import express from "express";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { UserRepository } from "../repository/UserRepository";
import { IdGerator } from "../utils/IdGerator";
import { HashManager } from "../utils/HashManager";
import { TokenManager } from "../utils/TokenManager";

export const userRoutes = express.Router();

const userController = new UserController(
  new UserService(
    new UserRepository(),
    new IdGerator(),
    new HashManager(),
    new TokenManager()
  )
);

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);