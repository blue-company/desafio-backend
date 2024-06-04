import { ensureAuthenticateUser } from "@/middlewares/ensure-authenticate-user";
import { Router } from "express";
import { AppointmentCancellationController } from "../controllers/appointment/appointment-cancellation-controller";
import { AppointmentOverviewController } from "../controllers/appointment/appointment-overview-controller";
import { AppointmentScheduleController } from "../controllers/appointment/appointment-schedule-controller";
import { AppointmentUpdateController } from "../controllers/appointment/appointment-update-controller";

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
