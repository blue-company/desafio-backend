import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from 'src/repositories/user-repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByEmail = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    const existingUserByCpf = await this.userRepository.findUserByCpf(
      createUserDto.cpf,
    );
    if (existingUserByCpf) {
      throw new ConflictException('CPF already in use');
    }

    const createdUser = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      cpf: createUserDto.cpf,
      dateBirth: new Date(createUserDto.dateBirth),
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }
}
