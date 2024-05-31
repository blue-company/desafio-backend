import { Response } from "express";
import { updateConsultation, findConsultationByToken, findConsultations, getUserById, scheduleConsultation } from "../services/ConsultationService";
import { AuthRequest } from "../middlewares/auth";
import path from "path";

export const scheduleConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        let { consultationDate, consultationTime, doctor_id } = req.body
        if (req.id && req.username) {
            let newConsultation = await scheduleConsultation({ consultationDate, consultationTime, doctor_id }, req.id, req.username)
            return res.status(201).json({ newConsultation })
        }

    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}

export const getConsultations = async (req: AuthRequest, res: Response) => {
    try {
        let user = await getUserById(req.id)
        if (user) {
            let consultations = await findConsultations(req.id)
            return res.status(200).json({ consultations })
        }
    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

export const getConsultation = async (req: AuthRequest, res: Response) => {
    try {
        let { token } = req.params

        if (req.id) {
            let consultation = await findConsultationByToken(token, req.id)

            let pdfPath = path.join(__dirname, '..', 'views', consultation.details.pdf);
            return res.sendFile(pdfPath)
        }

    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

export const updateConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        if (req.id && req.username) {
            let { id } = req.params;
            let { consultationDate, consultationTime, isCompleted } = req.body;
            let updatedConsultation = await updateConsultation(parseInt(id), req.id, req.username, { consultationDate, consultationTime, isCompleted });
            res.status(201).json({ updatedConsultation })
        }

    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}


