import { Schedules } from 'src/schedules/entities/schedules.entity';

export abstract class SchedulesRepository {
  abstract create(data: Schedules): Promise<Schedules>;
}
