import { AppointmentUpdateModel } from "@/models/appointment-update-model";
import { Request, Response } from "express";
import { z } from "zod";

export class AppointmentUpdateController {
  async handle(req: Request, res: Response) {
    const updateAppointmentParamsSchema = z.object({
      appointment_id: z.string().uuid(),
    });

    const updateAppointmentBodySchema = z.object({
      appointment_type: z.string().nullable(),
      appointment_datetime: z.string().nullable(),
      notes: z.string().nullable(),
    });

    const { appointment_id } = updateAppointmentParamsSchema.parse(req.params);

    const { appointment_type, appointment_datetime, notes } =
      updateAppointmentBodySchema.parse(req.body);

    const appointmentUpdate = new AppointmentUpdateModel();

    await appointmentUpdate.execute({
      appointment_id,
      appointment_type,
      appointment_datetime,
      notes,
    });

    res.status(204).send();
  }
}
