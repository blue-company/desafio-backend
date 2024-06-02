import { BaseError } from "@src/customErrors/BaseError";
import { createMedicalAppointSchema } from "../dtos/medicalAppointmentDTO/createMedicalAppointment.dto";
import { MedicalAppointService } from "../service/MedicalAppointService";
import { Response, Request } from 'express';
import { ZodError } from "zod";

export class MedicalAppointController{
    constructor(private medicalAppointService: MedicalAppointService){}

    getAppoint = async(req: Request, res: Response) => {
        try{
            
    
            // res.status(200).send(response);
        } catch(error){
            console.log(error);

            if (error instanceof ZodError) {
            res.status(400).send(error.issues);
            } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message);
            } else {
            res.status(500).send("erro inesperado");
        }
        }
    }

    create = async(req: Request, res: Response) => {
        try{
            const newAppoint = createMedicalAppointSchema.parse({
                token: req.headers.authorization,
                name: req.body.name,
                description: req.body.description,
                data: req.body.data
            })
    
            const response = await this.medicalAppointService.createAppoint(newAppoint);
    
            res.status(200).send(response);
        } catch(error){
            console.log(error);

            if (error instanceof ZodError) {
            res.status(400).send(error.issues);
            } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message);
            } else {
            res.status(500).send("erro inesperado");
        }
        }
    }
}