import { User } from 'src/user/entities/user.entity';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserByCpf(cpf: string): Promise<User | null>;
}
