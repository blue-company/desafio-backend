import { z } from "zod";

export interface loginInputDTO{
    email: string,
    password: string
}

export interface loginOutputDTO {
    message: string;
    token: string;
}
  
export const loginScheme = z.object({
    email: z.string().min(1).email().max(100),
    password: z.string().min(1).max(100),
});