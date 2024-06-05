import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import * as puppeteer from 'puppeteer';
import * as ejs from 'ejs';
import * as path from 'path';
import { SchedulesService } from './schedules.service';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
import { UserService } from 'src/user/user.service';
import { formatCPF, toConvertHours, toDateUtc } from 'src/utils';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSchedulesDto: CreateSchedulesDto,
    @CurrentUser() userToken: UserFromJwt,
    @Res() res: Response,
  ) {
    const dateTimeString = `${createSchedulesDto.date}T${createSchedulesDto.hours}`;
    const schedules = await this.schedulesService.create({
      dateTime: new Date(dateTimeString),
      user_id: userToken.id,
      medicalSpecialty: createSchedulesDto.medicalSpecialty,
    });

    const user = await this.userService.findByEmail(userToken.email);

    const schedulesUserData = {
      cpf: formatCPF(user.cpf),
      name: user.name.toUpperCase(),
      medicalSpecialty: schedules.medicalSpecialty.toUpperCase(),
      dateBirth: toDateUtc(user.dateBirth),
      date: schedules.dateTime.toLocaleDateString(),
      hours: toConvertHours(schedules.dateTime),
    };

    const html = await ejs.renderFile(
      path.resolve(__dirname, '../../src/assets/schedules-pdf.ejs'),
      { schedulesUserData },
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=user_profile.pdf',
    );

    return res.send(pdfBuffer);
  }
}
