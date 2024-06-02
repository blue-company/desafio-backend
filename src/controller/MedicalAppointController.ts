import { BaseError } from "../customErrors/BaseError";
import { createMedicalAppointSchema } from "../dtos/medicalAppointmentDTO/createMedicalAppointment.dto";
import { MedicalAppointService } from "../service/MedicalAppointService";
import { Response, Request } from 'express';
import { ZodError } from "zod";
import { getMedicalAppointSchema } from "../dtos/medicalAppointmentDTO/getMedicalAppointment.dto";
import { editMedicalAppointSchema } from "../dtos/medicalAppointmentDTO/editMedicalAppointment.dto";
import { cancelMedicalAppointSchema } from "../dtos/medicalAppointmentDTO/cancelMedicalAppointment.dto";

export class MedicalAppointController{
    constructor(private medicalAppointService: MedicalAppointService){}

    getAppoint = async(req: Request, res: Response) => {
        try{
            const appointSearch = getMedicalAppointSchema.parse({
                token: req.headers.authorization
            });

            const response = await this.medicalAppointService.getAppoint(appointSearch);
    
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

    getAppointByIdUser = async(req: Request, res: Response) => {
        try{
            const ids = {
                idUser: req.params.idUser,
                idAppoint: req.params.idAppoint
            };

            const response = await this.medicalAppointService.getAppointByIdUser(ids);
    
            res.status(200).end(response);
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

    edit = async(req: Request, res: Response) => {
        try{
            const appointForEdit = editMedicalAppointSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
                name: req.body.name,
                data: req.body.data,
                status: req.body.status,
                description: req.body.description
            })
    
            const response = await this.medicalAppointService.editAppoint(appointForEdit);
    
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

    cancel = async(req: Request, res: Response) => {
        try{
            const appointForCancel = cancelMedicalAppointSchema.parse({
                token: req.headers.authorization,
                id: req.params.id
            });
    
            const response = await this.medicalAppointService.cancel(appointForCancel);
    
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