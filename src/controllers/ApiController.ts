import { Response } from "express";
import { updateConsultation, getConsultation, getConsultations, scheduleConsultation, cancelConsultation, getDoctors } from "../services/ConsultationService";
import { AuthRequest } from "../middlewares/auth";
import path from "path";

export const scheduleConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        let { consultationDate, consultationTime, doctor_id } = req.body

        let newConsultation = await scheduleConsultation({ consultationDate, consultationTime, doctor_id }, req.id, req.username)
        return res.status(201).json({ newConsultation })

    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}

export const getConsultationsController = async (req: AuthRequest, res: Response) => {
    try {
        let consultations = await getConsultations(req.id)

        return res.status(200).json({ consultations })
    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

export const getConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        let { token } = req.params

        let consultation = await getConsultation(token)
        let pdfPath = path.join(__dirname, '..', 'views', consultation.details.pdf);

        return res.sendFile(pdfPath)

    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

export const updateConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        let { id } = req.params;
        let { consultationDate, consultationTime, isCompleted } = req.body;

        let updatedConsultation = await updateConsultation(parseInt(id), req.id, req.username, { consultationDate, consultationTime, isCompleted });
        res.status(201).json({ updatedConsultation })

    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}

export const cancelConsultationController = async (req: AuthRequest, res: Response) => {
    try {
        let { id } = req.params
        await cancelConsultation(parseInt(id), req.id)
        res.status(200).json({ message: 'Consulta cancelada com sucesso' })

    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}


export const getDoctorsController = async (req: AuthRequest, res: Response) => {
    try {
        let doctors = await getDoctors()
        return res.status(200).json({ doctors })
    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

