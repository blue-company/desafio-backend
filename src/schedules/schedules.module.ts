import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesRepository } from 'src/repositories/schedules-repository';
import { PrismaSchedulesRepository } from 'src/repositories/prisma/prisma-schedules-repository';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-user-repository';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    UserService,
    PrismaService,
    {
      provide: SchedulesRepository,
      useClass: PrismaSchedulesRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [SchedulesService],
})
export class SchedulesModule {}
