import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredencialsError } from "./errors/invalid-credentials-error";

interface UserAuthenticateRequest {
  email: string;
  password: string;
}

interface UserAuthenticateResponse {
  user: User;
}

export class UserAuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: UserAuthenticateRequest): Promise<UserAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);

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
