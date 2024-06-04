import { Request, Response } from "express";
import { z } from "zod";
import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { AppointmentUpdateService } from "../../services/appointment-update-service";
import { formatDateForString } from "../../utils/format-date";
import { pdfGenerator } from "../../utils/pdf-generator";

export class AppointmentUpdateController {
  async handle(req: Request, res: Response) {
    const user = z.object({
      user_id: z.string().uuid(),
      name: z.string(),
    });

    const updateAppointmentParamsSchema = z.object({
      appointment_id: z.string().uuid(),
    });

    const updateAppointmentBodySchema = z.object({
      appointment_type: z.string().nullable(),
      appointment_date: z.string().nullable(),
      notes: z.string().nullable(),
    });

    const { user_id, name } = user.parse(req);

    const { appointment_id } = updateAppointmentParamsSchema.parse(req.params);

    const { appointment_type, appointment_date, notes } =
      updateAppointmentBodySchema.parse(req.body);

    const appointmentsRepository = new PrismaAppointmentsRepository();
    const appointmentUpdate = new AppointmentUpdateService(
      appointmentsRepository
    );

    const { appointment } = await appointmentUpdate.execute({
      appointment_id,
      appointment_type,
      appointment_date,
      notes,
    });

    const pdfBuffer = await pdfGenerator({
      user_name: name,
      appointment_date: formatDateForString(appointment.appointment_datetime),
      appointment_type: appointment.appointment_type,
      status: appointment.status,
      notes: appointment.notes,
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${appointment.id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    res.status(200).send(pdfBuffer);
  }
}
