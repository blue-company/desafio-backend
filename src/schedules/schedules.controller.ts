import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { Schedules } from './entities/schedules.entity';
import { UpdateSchedules } from './dto/update-schedules.dto';

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

  @Get('pdf/:id')
  @UseGuards(JwtAuthGuard)
  async generatePDFSchedulesId(
    @Param('id') id: string,
    @CurrentUser() userToken: UserFromJwt,
    @Res() res: Response,
  ) {
    const schedules = await this.schedulesService.findByIdSchedules(id);
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findByIdSchedules(
    @Param('id') id: string,
    @CurrentUser() userToken: UserFromJwt,
  ) {
    const schedules = await this.schedulesService.findByIdSchedules(id);
    const user = await this.userService.findByEmail(userToken.email);

    const schedulesUserData = {
      cpf: formatCPF(user.cpf),
      name: user.name.toUpperCase(),
      medicalSpecialty: schedules.medicalSpecialty.toUpperCase(),
      dateBirth: toDateUtc(user.dateBirth),
      date: schedules.dateTime.toLocaleDateString(),
      hours: toConvertHours(schedules.dateTime),
    };
    return schedulesUserData;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllSchedules(@CurrentUser() userToken: UserFromJwt) {
    const schedulesAll = await this.schedulesService.findAllSchedules(
      userToken.id,
    );
    const user = await this.userService.findByEmail(userToken.email);

    const data = schedulesAll.map((schedules: Schedules) => {
      return {
        id: schedules.id,
        userId: schedules.user_id,
        name: user.name,
        dateBirth: toDateUtc(user.dateBirth),
        medicalSpecialty: schedules.medicalSpecialty,
        date: schedules.dateTime.toLocaleDateString(),
        hours: toConvertHours(schedules.dateTime),
        createdAt: schedules.createdAt,
        updatedAt: schedules.updatedAt,
      };
    });

    return data;
  }

  @Patch(':id')
  async updateSchedules(
    @Body() updateSchedules: UpdateSchedules,
    @Param('id') id: string,
  ) {
    const dateTimeString = `${updateSchedules.date}T${updateSchedules.hours}`;
    const dateTime = new Date(dateTimeString);
    const update = await this.schedulesService.updateSchedules(id, dateTime);
    return { id: update.id };
  }

  @Delete(':id')
  async deleteSchedules(@Param('id') id: string) {
    await this.schedulesService.deleteSchedules(id);
  }
}
