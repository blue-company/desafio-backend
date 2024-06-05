import { Schedules } from '../entities/schedules.entity';
import { IsDateString, IsString } from 'class-validator';

export class UpdateSchedules extends Schedules {
  @IsDateString()
  date: Date;

  @IsString()
  hours: string;
}
