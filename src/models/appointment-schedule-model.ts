import { Appointment } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../db/prisma";
import { formatDate } from "../utils/format-date";
import { InvalidAppointmentDateError } from "./errors/invalid-appointment-date-error";

interface AppointmentScheduleRequest {
  user_id: string;
  appointment_type: string;
  appointment_date: string;
  notes: string;
}

interface AppointmentScheduleResponse {
  appointment: Appointment;
}

export class AppointmentScheduleModel {
  async execute({
    user_id,
    appointment_type,
    appointment_date,
    notes,
  }: AppointmentScheduleRequest): Promise<AppointmentScheduleResponse> {
    const appointment_datetime = formatDate(appointment_date);
    const currentDate = dayjs();
    const minimumAppointmentDate = currentDate.add(1, "day");

    if (!dayjs(appointment_datetime).isAfter(minimumAppointmentDate)) {
      throw new InvalidAppointmentDateError();
    }

    const appointment = await prisma.appointment.create({
      data: {
        appointment_type,
        appointment_datetime,
        status: "SCHEDULED",
        notes,
        user_id,
      },
    });

    return { appointment };
  }
}
