import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface AppointmentOverviewRequest {
  user_id: string;
}

interface AppointmentOverviewResponse {
  appointments: Appointment[];
}

export class AppointmentOverviewService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    user_id,
  }: AppointmentOverviewRequest): Promise<AppointmentOverviewResponse | []> {
    const appointments = await this.appointmentsRepository.findByUserId(
      user_id
    );

    return { appointments };
  }
}
