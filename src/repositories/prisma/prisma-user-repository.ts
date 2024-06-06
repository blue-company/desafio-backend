import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findUserByCpf(cpf: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { cpf } });
  }
}
