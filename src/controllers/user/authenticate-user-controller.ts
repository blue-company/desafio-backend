import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { InvalidCredencialsError } from "../../models/errors/invalid-credentials-error";
import { UserAuthenticateModel } from "../../models/user-authenticate-model";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const authUser = z.object({
      email: z.string().email(),
      password: z.string().min(5).max(15),
    });
    const { email, password } = authUser.parse(req.body);

    const userAuthenticateModel = new UserAuthenticateModel();

    try {
      const { user } = await userAuthenticateModel.execute({
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
