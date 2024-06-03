import { z } from "zod";

export interface cancelMedicalAppointmentInputDTO{
    id: string,
    token: string,
}


export const cancelMedicalAppointSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1)
})