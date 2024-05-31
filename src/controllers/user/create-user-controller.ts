import { Request, Response } from "express";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../models/errors/user-already-exists-error";
import { UserCreateModel } from "../../models/user-create-model";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUser = z.object({
      email: z.string().email(),
      password: z.string().min(5).max(15),
    });

    const { email, password } = req.body;

    try {
      const userCreateModel = new UserCreateModel();

      await userCreateModel.execute({ email, password });
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return res.status(409).send({ message: err.message });
      }

      throw err;
    }

    return res.status(201).send();
  }
}
