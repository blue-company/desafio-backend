import { Consult } from "@prisma/client";
import { ConsultModel } from "../Models/consult";
import { Request, Response } from "express";
import { createPdf } from "../utils/createPdf";

export class ConsultController {
    private consultModel: ConsultModel
    constructor(consulModel: ConsultModel){ this.consultModel = consulModel }

    async createConsult(req: Request, res: Response) {
        const consult: Consult = req.body;
        const user = (req as any).user;
        const { id } = user;

        try {
            const createConsult = await this.consultModel.createConsult(consult, id)
            if(!createConsult) {
                res.status(400).json({ Message: 'Consulta não cadastrada!' });
                return;
            }
            const filePath = await createPdf(createConsult);
            return res.status(200).sendFile(filePath);

        } catch (error) {
            throw error;
        }
    }

    async findConsult(req: Request, res: Response) {
        const { protocol } = req.body;
        const user = (req as any).user;
        const { id } = user;

        try {
            const findConsult = await this.consultModel.findConsult(id, protocol);
            if(!findConsult) {
                res.status(400).json({ Message: 'Consulta não encontrada!' });
                return;
            }
            return res.status(200).json(findConsult);
        } catch (error) {
            throw error;
        }
    }

    async updateConsult(req: Request, res: Response) {
        const consult: Consult = req.body;
        const { protocol } = req.query

        try {
            const updateConsult = await this.consultModel.editConsult(consult, protocol);
            if(!updateConsult) {
                res.status(400).json({ Message: "Falha na atualização!" })
                return;
            }
            return res.status(200).json(updateConsult);

        } catch (error) {
            throw error;
        }
    }

    async deleteConsult(req: Request, res: Response) {
        const user = (req as any).user;
        const { id } = user;
        const { protocol } = req.query

        try {
            const cancelConsult = await this.consultModel.cancelConsult(id, protocol);
            if(!cancelConsult) {
                res.status(400).json({ Message: "Falha no cancelamento!" })
                return;
            }
            return res.status(200).json(cancelConsult);
        } catch (error) {
            throw error;
        }
    }
}