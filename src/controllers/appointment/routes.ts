import { ensureAuthenticateUser } from "@/middlewares/ensure-authenticate-user";
import { Router } from "express";
import { AppointmentCancellationController } from "./appointment-cancellation-controller";
import { AppointmentOverviewController } from "./appointment-overview-controller";
import { AppointmentScheduleController } from "./appointment-schedule-controller";
import { AppointmentUpdateController } from "./appointment-update-controller";

const appointmentRoutes = Router();

const appointmentSchedule = new AppointmentScheduleController();
const appointmentOverview = new AppointmentOverviewController();
const appointmentCancellation = new AppointmentCancellationController();
const appointmentUpdate = new AppointmentUpdateController();

appointmentRoutes.post("/", ensureAuthenticateUser, appointmentSchedule.handle);
appointmentRoutes.get("/", ensureAuthenticateUser, appointmentOverview.handle);
appointmentRoutes.patch(
  "/:appointment_id",
  ensureAuthenticateUser,
  appointmentUpdate.handle
);
appointmentRoutes.delete(
  "/:appointment_id",
  ensureAuthenticateUser,
  appointmentCancellation.handle
);

export { appointmentRoutes };
