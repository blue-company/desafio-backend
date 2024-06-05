import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulesRepository } from 'src/repositories/schedules-repository';
import { Schedules } from './entities/schedules.entity';

@Injectable()
export class SchedulesService {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async create(data: Schedules): Promise<Schedules> {
    const createdSchedules = await this.schedulesRepository.create(data);

    return createdSchedules;
  }

  async findByIdSchedules(id: string): Promise<Schedules> {
    const schedules = await this.schedulesRepository.findByIdSchedules(id);
    if (!schedules) {
      throw new NotFoundException(`ID not found`);
    }
    return schedules;
  }

  async findAllSchedules(userId: string): Promise<Schedules[]> {
    const schedulesAll =
      await this.schedulesRepository.findAllSchedules(userId);
    if (schedulesAll.length == 0) {
      throw new NotFoundException(`No appointments scheduled`);
    }
    return schedulesAll;
  }

  async updateSchedules(id: string, dateTime: Date): Promise<Schedules> {
    const schedules = await this.schedulesRepository.findByIdSchedules(id);
    if (!schedules) {
      throw new NotFoundException(`ID not found`);
    }
    const update = await this.schedulesRepository.updateSchedules(id, dateTime);
    return update;
  }
}
