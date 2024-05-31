import { Request, Response } from "express";
import { checkExistingConsultation, createConsultation, createConsultationPDF, findConsultation, findConsultations, generateConsultationToken, getDoctorById, validateConsultation } from "../services/ConsultationService";
import { Consultation } from "../models/Consultation";
import { AuthRequest } from "../middlewares/auth";
import path from "path";

interface BodyConsultation {
    consultationDate: string,
    consultationTime: string,
    doctor_id: number,
}

export const scheduleConsultation = async (req: AuthRequest, res: Response) => {
    try {
        let { consultationDate, consultationTime, doctor_id }: BodyConsultation = req.body
        validateConsultation(consultationDate, consultationTime, doctor_id)

        let doctor = await getDoctorById(doctor_id)

        await checkExistingConsultation(consultationDate, consultationTime, doctor_id, doctor.name)

        if (req.username && req.id) {
            let formattedDate = consultationDate.split('/').reverse().join('/')
            const pdf = await createConsultationPDF(
                req.id,
                req.username,
                doctor.name,
                consultationTime,
                formattedDate,
                doctor.speciality
            )

            if (typeof (pdf) === 'string') {
                let consultationToken = generateConsultationToken()
                let data = {
                    token: consultationToken,
                    consultationDate,
                    consultationTime,
                    doctor_id,
                    user_id: req.id,
                    details: {
                        doctorName: doctor.name.trim(),
                        username: req.username,
                        pdf: pdf
                    }
                }
                let newConsultation = await createConsultation(data)
                return res.status(201).json({ newConsultation })
            }
        }
    } catch (err: any) {
        res.status(400).json({ err: err.message })
    }
}

export const getConsultations = async (req: AuthRequest, res: Response) => {
    try {
        if (req.id && req.username) {
            let consultations = await findConsultations(req.id, req.username)
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
            let consultation = await findConsultation(token, req.id)
            if (typeof (consultation.details.pdf) === 'string') {
                const pdfPath = path.join(__dirname, '..', 'views', consultation.details.pdf);
                return res.sendFile(pdfPath)
            }
        }

    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}


export const updateConsultation = async (req: AuthRequest, res: Response) => {
    let { consultationDate, consultationTime, isCompleted } = req.body
}
