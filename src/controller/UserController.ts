import { BaseError } from "@src/customErrors/BaseError";
import { loginScheme } from "@src/dtos/userDTO/login.dto";
import { signupScheme } from "@src/dtos/userDTO/signup.dto";
import { UserService } from "@src/service/UserService";
import { Response, Request } from 'express';
import { ZodError } from "zod";

export class UserController{
    constructor(private userService: UserService){}

    signup = async (req: Request, res: Response) => {
        try{
            const newUser = signupScheme.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            const response = await this.userService.signup(newUser);

            res.status(200).send(response);
        } catch(error){
            if (error instanceof ZodError) {
                res.status(400).send(error.issues);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("erro inesperado");
            }
        }
    };

    login = async (req: Request, res: Response) => {
        try {
          const user = loginScheme.parse({
            email: req.body.email,
            password: req.body.password,
          });
    
          const response = await this.userService.login(user);
    
          res.status(200).send(response);
        } catch (error) {
          console.log(error);
    
          if (error instanceof ZodError) {
            res.status(400).send(error.issues);
          } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message);
          } else {
            res.status(500).send("erro inesperado");
          }
        }
      };
}