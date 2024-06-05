import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from 'src/repositories/schedules-repository';
import { Schedules } from './entities/schedules.entity';

@Injectable()
export class SchedulesService {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async create(data: Schedules): Promise<Schedules> {
    const createdSchedules = await this.schedulesRepository.create(data);

    return createdSchedules;
  }
}
