import { User } from 'src/user/entities/user.entity';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserByCpf(cpf: string): Promise<User | null>;
}
