import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

interface UserCreateResponse {
  user: User;
}

export class UserCreateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserCreateRequest): Promise<UserCreateResponse> {
    password = await hash(password, 10);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({ name, email, password });

    return { user };
  }
}
