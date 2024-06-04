import { Request, Response } from "express";
import { z } from "zod";
import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { AppointmentOverviewService } from "../../services/appointment-overview-service";

export class AppointmentOverviewController {
  async handle(req: Request, res: Response) {
    const id = z.object({
      user_id: z.string().uuid(),
    });

    const { user_id } = id.parse(req);

    const appointmentsRepository = new PrismaAppointmentsRepository();
    const appointmentOverview = new AppointmentOverviewService(
      appointmentsRepository
    );

    const appointments = await appointmentOverview.execute({ user_id });

    res.status(200).send(appointments);
  }
}
