import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { InvalidCredencialsError } from "../../services/errors/invalid-credentials-error";
import { UserAuthenticateService } from "../../services/user-authenticate-service";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const authUser = z.object({
      email: z.string().email(),
      password: z.string().min(5).max(15),
    });
    const { email, password } = authUser.parse(req.body);

    const usersRepository = new PrismaUsersRepository();
    const userAuthenticate = new UserAuthenticateService(usersRepository);

    try {
      const { user } = await userAuthenticate.execute({
        email,
        password,
      });

      const token = sign(
        { name: user.name },
        process.env.JWT_SECRET || "unit-test",
        {
          subject: user.id,
          expiresIn: "1d",
        }
      );

      return res.status(200).send({
        token,
      });
    } catch (err) {
      if (err instanceof InvalidCredencialsError) {
        return res.status(401).send({ message: err.message });
      }

      throw err;
    }
  }
}
