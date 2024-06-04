import { Request, Response } from "express";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../services/errors/user-already-exists-error";
import { UserCreateService } from "../../services/user-create-service";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUser = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(5, { message: "A senha deve ter no mínimo 5 caracteres." })
        .max(15, { message: "A senha deve ter no máximo 15 caracteres." })
        .refine((password) => /[A-Z]/.test(password), {
          message: "A senha deve conter pelo menos uma letra maiúscula.",
        })
        .refine((password) => /[!@#$%^&*()?.:{}|<>]/.test(password), {
          message: "A senha deve conter pelo menos um caractere especial.",
        }),
    });
    try {
      const { name, email, password } = createUser.parse(req.body);

      const usersRepository = new PrismaUsersRepository();
      const userCreate = new UserCreateService(usersRepository);

      await userCreate.execute({ name, email, password });

      return res.status(201).send();
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log("entrou");

        return res.status(400).send({
          messages: err.errors.map((error) => ({
            error: error.message,
          })),
        });
      }

      if (err instanceof UserAlreadyExistsError) {
        return res.status(409).send({ message: err.message });
      }

      throw err;
    }
  }
}
