import { Schedules } from 'src/schedules/entities/schedules.entity';

export abstract class SchedulesRepository {
  abstract create(data: Schedules): Promise<Schedules>;
  abstract findByIdSchedules(id: string): Promise<Schedules | null>;
}
