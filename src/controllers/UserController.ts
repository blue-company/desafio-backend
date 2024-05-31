import { Request, Response } from "express";
import { generatePDF } from "../services/ConsultationService";
import { Consultation } from "../models/Consultation";
import { Doctor } from "../models/Doctor";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/auth";
import { isDate, isTime } from "validator";

interface BodyConsultation {
    consultationDate: string,
    consultationTime: string,
    doctor_id: number,
}

export const scheduleConsultation = async (req: AuthRequest, res: Response) => {
    try {
        let { consultationDate, consultationTime, doctor_id }: BodyConsultation = req.body

        if (!consultationDate || !consultationTime || !doctor_id) {
            return res.status(400).json({ err: 'Preencha todos os campos para agendar a consulta!' })
        }

        if (!isDate(consultationDate, { delimiters: ['/'] })) {
            return res.status(400).json({ err: 'Data inválida' })
        }

        if (!isTime(consultationTime, { hourFormat: 'hour24', mode: 'default' })) {
            return res.status(400).json({ err: 'Horário inválido' })
        }

        let doctor = await Doctor.findByPk(doctor_id)
        if (!doctor) {
            return res.status(400).json({ err: 'Médico não encontrado' })
        }

        let hasConsultation = await Consultation.findOne({ where: { consultationDate, consultationTime, doctor_id } })

        if (hasConsultation) {
            return res.status(400).json({ err: `Já existe uma consulta marcada com o Dr. ${doctor.name} para esse horário` })
        }

        if (req.username) {
            const pdf = await generatePDF(
                req.id, req.username,
                doctor.name,
                consultationTime,
                consultationDate,
                doctor.speciality
            )

            if (typeof (pdf) === 'string') {
                let data = {
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
                let newConsultation = await Consultation.create(data)
                return res.status(201).json({ newConsultation })
            }
        }

    } catch (err) {
        res.status(404).json({ err })
    }
}

