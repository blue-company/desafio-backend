import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from '../schedules-repository';
import { Schedules } from 'src/schedules/entities/schedules.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaSchedulesRepository implements SchedulesRepository {
  constructor(private prisma: PrismaService) {}

  async deleteSchedules(id: string) {
    return this.prisma.schedules.delete({ where: { id } });
  }

  async updateSchedules(id: string, dateTime: Date): Promise<Schedules> {
    const update = await this.prisma.schedules.update({
      where: { id },
      data: { dateTime },
    });
    return update;
  }

  async findAllSchedules(userId: string): Promise<Schedules[]> {
    const schedulesAll = await this.prisma.schedules.findMany({
      where: { user_id: userId },
    });

    return schedulesAll;
  }

  async create(data: Schedules): Promise<Schedules> {
    const schedules = await this.prisma.schedules.create({ data });
    return schedules;
  }

  async findByIdSchedules(id: string): Promise<Schedules> {
    const schedules = await this.prisma.schedules.findUnique({ where: { id } });
    return schedules;
  }
}
