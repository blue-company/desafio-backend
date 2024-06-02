import { z } from "zod";
import { Buffer } from "buffer";

export interface getMedicalAppointmentInputDTO{
    token: string,
}

export interface getMedicalAppointmentOutputDTO{
    message: string,
    links: string[]
}

export const getMedicalAppointSchema = z.object({
    token: z.string().min(97).max(1400)
})