import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSchedulesDto: CreateSchedulesDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    const dateTimeString = `${createSchedulesDto.date}T${createSchedulesDto.hours}`;
    // console.log(teste.toLocaleString(), '-----------toLocaleDateString');
    return this.schedulesService.create({
      dateTime: new Date(dateTimeString),
      user_id: user.id,
      medicalSpecialty: createSchedulesDto.medicalSpecialty,
    });
  }
}
