import { Request, Response } from "express";
import { z } from "zod";
import { AppointmentScheduleModel } from "../../models/appointment-schedule-model";
import { InvalidAppointmentDateError } from "../../models/errors/invalid-appointment-date-error";
import { formatDate } from "../../utils/format-date";

export class AppointmentScheduleController {
  async handle(req: Request, res: Response) {
    const id = z.object({
      user_id: z.string().uuid(),
    });

    const createAppointment = z.object({
      appointment_type: z.string(),
      appointment_datetime: z.string().transform((str) => {
        return formatDate(str);
      }),
      notes: z.string(),
    });

    const { user_id } = id.parse(req);
    const { appointment_type, appointment_datetime, notes } =
      createAppointment.parse(req.body);

    const appointmentScheduleModel = new AppointmentScheduleModel();

    try {
      await appointmentScheduleModel.execute({
        user_id,
        appointment_datetime,
        appointment_type,
        notes,
      });

      res.status(201).send();
    } catch (err) {
      if (err instanceof InvalidAppointmentDateError) {
        return res.status(400).send({ message: err.message });
      }
      throw err;
    }
  }
}
