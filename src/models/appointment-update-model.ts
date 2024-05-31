import { Appointment } from "@prisma/client";
import { prisma } from "../db/prisma";
import { formatDate } from "../utils/format-date";

interface AppointmentUpdateRequest {
  appointment_id: string;
  appointment_type: string | null;
  appointment_datetime: string | null;
  notes: string | null;
}

interface AppointmentUpdateResponse {
  appointment: Appointment;
}

export class AppointmentUpdateModel {
  async execute({
    appointment_id,
    appointment_datetime,
    appointment_type,
    notes,
  }: AppointmentUpdateRequest): Promise<AppointmentUpdateResponse> {
    const data: any = {};

    if (appointment_datetime) {
      data.appointment_datetime = formatDate(appointment_datetime);
    }

    if (appointment_type) {
      data.appointment_type = appointment_type;
    }

    if (notes) {
      data.notes = notes;
    }

    data.updated_at = new Date();

    const appointment = await prisma.appointment.update({
      where: {
        id: appointment_id,
      },
      data: data,
    });

    return { appointment };
  }
}
