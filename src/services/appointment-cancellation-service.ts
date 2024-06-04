import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface AppointmentCancellationRequest {
  user_id: string;
  appointment_id: string;
}

interface AppointmentCancellationResponse {
  appointment: Appointment;
}

export class AppointmentCancellationService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}
  async execute({
    user_id,
    appointment_id,
  }: AppointmentCancellationRequest): Promise<AppointmentCancellationResponse> {
    const appointment = await this.appointmentsRepository.cancel(
      appointment_id,
      user_id
    );

    return { appointment };
  }
}
