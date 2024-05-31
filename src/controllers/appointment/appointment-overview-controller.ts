import { AppointmentOverviewModel } from "@/models/appointment-overview-model";
import { Request, Response } from "express";
import { z } from "zod";

export class AppointmentOverviewController {
  async handle(req: Request, res: Response) {
    const id = z.object({
      user_id: z.string().uuid(),
    });

    const { user_id } = id.parse(req);
    const appointmentOverviewModel = new AppointmentOverviewModel();

    const appointments = await appointmentOverviewModel.execute({ user_id });

    res.status(200).send(appointments);
  }
}
