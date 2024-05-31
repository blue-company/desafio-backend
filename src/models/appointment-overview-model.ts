import { prisma } from "@/db/prisma";
import { Appointment } from "@prisma/client";

interface AppointmentOverviewRequest {
  user_id: string;
}

interface AppointmentOverviewResponse {
  appointments: Appointment[];
}

export class AppointmentOverviewModel {
  async execute({
    user_id,
  }: AppointmentOverviewRequest): Promise<AppointmentOverviewResponse | null> {
    const appointments = await prisma.appointment.findMany({
      where: {
        user_id,
      },
    });

    return { appointments };
  }
}
