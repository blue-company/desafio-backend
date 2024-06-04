import { Appointment, Prisma } from "@prisma/client";

export interface AppointmentsRepository {
  create(data: Prisma.AppointmentCreateInput): Promise<Appointment>;
  findByUserId(user_id: string): Promise<Appointment[] | []>;
  update(
    appointment_id: string,
    data: Prisma.AppointmentUpdateInput
  ): Promise<Appointment>;
  cancel(appointment_id: string, user_id: string): Promise<Appointment>;
}
