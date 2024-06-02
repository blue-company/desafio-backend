import { z } from "zod";

export interface createMedicalAppointmentInputDTO{
    token: string;
    name: string;
    description?: string;
    data: string;
}

export interface createMedicalAppointmentOutputDTO{
    message: string,
    link: string
}

export const createMedicalAppointSchema = z.object({
    token: z.string().min(1),
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    data: z.string().min(1).max(100),
})