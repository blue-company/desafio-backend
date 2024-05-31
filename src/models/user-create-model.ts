import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../db/prisma";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface UserCreateRequest {
  email: string;
  password: string;
}

interface UserCreateResponse {
  user: User;
}

export class UserCreateModel {
  async execute({
    email,
    password,
  }: UserCreateRequest): Promise<UserCreateResponse> {
    password = await hash(password, 10);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return { user };
  }
}
