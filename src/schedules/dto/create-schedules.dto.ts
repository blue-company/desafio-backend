import { Schedules } from '../entities/schedules.entity';
import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchedulesDto extends Schedules {
  @ApiProperty({
    example: 'AAAA-MM-DD',
    description: `Data da consulta, a mesma deve ser do seguinte formato AAAA-MM-DD.`,
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: 'HH:MM:SS',
    description: `Hora da consulta, a mesma deve ser do seguinte formato HH:MM:SS.`,
  })
  @IsString()
  hours: string;

  @ApiProperty({
    example: 'Clínico geral',
    description: `Especialidade escolhida.`,
  })
  @IsString()
  medicalSpecialty: string;
}
