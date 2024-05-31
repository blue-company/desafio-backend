import { Appointment } from "@prisma/client";
import { prisma } from "../db/prisma";

interface AppointmentCancellationRequest {
  user_id: string;
  appointment_id: string;
}

interface AppointmentCancellationResponse {
  appointment: Appointment;
}

export class AppointmentCancellationModel {
  async execute({
    user_id,
    appointment_id,
  }: AppointmentCancellationRequest): Promise<AppointmentCancellationResponse> {
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

    return { appointment };
  }
}
