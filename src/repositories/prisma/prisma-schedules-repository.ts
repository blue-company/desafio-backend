import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from '../schedules-repository';
import { Schedules } from 'src/schedules/entities/schedules.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaSchedulesRepository implements SchedulesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Schedules): Promise<Schedules> {
    const schedules = await this.prisma.schedules.create({ data });
    return schedules;
  }

  async findByIdSchedules(id: string): Promise<Schedules> {
    const schedules = await this.prisma.schedules.findUnique({ where: { id } });
    return schedules;
  }
}
