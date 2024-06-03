import { STATUS_APPOINTMENT } from "../../models/medicalAppointment";
import { z } from "zod";

export interface editMedicalAppointmentInputDTO{
    id: string;
    token: string;
    name: string;
    data: string;
    status: STATUS_APPOINTMENT;
    description?: string;
    
}

export interface editMedicalAppointmentOutputDTO{
    message: string,
    link: string
}

export const editMedicalAppointSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1),
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    data: z.string().min(1).max(100),
    status: z.nativeEnum(STATUS_APPOINTMENT)
})