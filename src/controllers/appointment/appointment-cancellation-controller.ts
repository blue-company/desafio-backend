import { Request, Response } from "express";
import { z } from "zod";
import { AppointmentCancellationModel } from "../../models/appointment-cancellation-model";

export class AppointmentCancellationController {
  async handle(req: Request, res: Response) {
    const id = z.object({
      user_id: z.string().uuid(),
    });

    const createAppointmentParamsSchema = z.object({
      appointment_id: z.string().uuid(),
    });

    const { user_id } = id.parse(req);
    const { appointment_id } = createAppointmentParamsSchema.parse(req.params);

    const appointmentCancellation = new AppointmentCancellationModel();

    try {
      await appointmentCancellation.execute({
        user_id,
        appointment_id,
      });

      res.status(200).send();
    } catch (err) {
      throw err;
    }
  }
}
