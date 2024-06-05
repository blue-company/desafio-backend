import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesRepository } from 'src/repositories/schedules-repository';
import { PrismaSchedulesRepository } from 'src/repositories/prisma/prisma-schedules-repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    PrismaService,
    {
      provide: SchedulesRepository,
      useClass: PrismaSchedulesRepository,
    },
  ],
  exports: [SchedulesService],
})
export class SchedulesModule {}
