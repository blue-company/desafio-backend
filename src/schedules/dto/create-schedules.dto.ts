import { Schedules } from '../entities/schedules.entity';
import { IsDateString, IsString } from 'class-validator';

export class CreateSchedulesDto extends Schedules {
  @IsDateString()
  date: Date;

  @IsString()
  hours: string;

  @IsString()
  medicalSpecialty: string;
}
