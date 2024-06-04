import { Appointment, Prisma } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { AppointmentsRepository } from "../appointments-repository";

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
    const appointment = await prisma.appointment.create({
      data,
    });

    return appointment;
  }

  async findByUserId(user_id: string): Promise<Appointment[] | []> {
    const appointments = await prisma.appointment.findMany({
      where: {
        user_id,
      },
    });

    return appointments;
  }

  async update(
    appointment_id: string,
    data: Prisma.AppointmentUpdateInput
  ): Promise<Appointment> {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointment_id,
      },
      data: data,
    });

    return appointment;
  }

  async cancel(appointment_id: string, user_id: string): Promise<Appointment> {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointment_id,
        user_id,
      },
      data: {
        status: "CANCELED",
        updated_at: new Date(),
      },
    });

    return appointment;
  }
}
