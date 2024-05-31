import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { prisma } from "../db/prisma";
import { InvalidCredencialsError } from "./errors/invalid-credentials-error";

interface UserAuthenticateRequest {
  email: string;
  password: string;
}

interface UserAuthenticateResponse {
  user: User;
}

export class UserAuthenticateModel {
  async execute({
    email,
    password,
  }: UserAuthenticateRequest): Promise<UserAuthenticateResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new InvalidCredencialsError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredencialsError();
    }

    return { user };
  }
}
