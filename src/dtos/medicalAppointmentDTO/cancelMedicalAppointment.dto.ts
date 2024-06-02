import { z } from "zod";

export interface cancelMedicalAppointmentInputDTO{
    id: string,
    token: string,
}


export const cancelMedicalAppointSchema = z.object({
    id: z.string().min(0).max(36),
    token: z.string().min(97).max(1400)
})