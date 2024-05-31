import { Request, Response } from "express";
import { generatePDF, generateToken } from "../services/ConsultationService";
import { Consultation } from "../models/Consultation";
import { Doctor } from "../models/Doctor";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/auth";
import { isDate, isTime } from "validator";
import path from "path";

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
                req.id, 
                req.username,
                doctor.name,
                consultationTime,
                consultationDate,
                doctor.speciality
            )

            if (typeof (pdf) === 'string') {
                const consultationToken = generateToken(10)
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
                let newConsultation = await Consultation.create(data)
                return res.status(201).json({ newConsultation })
            }
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}

export const getConsultations = async (req: AuthRequest, res: Response) => {
    try {
        let consultations = await Consultation.findAll({ where: { user_id: req.id } })
        if (!consultations || consultations.length === 0) {
            return res.status(400).json({ err: `Não foi encontrado um histórico de consultas para o usuário ${req.username}` })
        }

        return res.status(200).json({ consultations })
    } catch (err) {
        return res.status(404).json({ err })
    }
}

export const getConsultation = async (req: AuthRequest, res: Response) => {
    try {
        let { token } = req.params
        if(!token) {
            return res.status(400).json({err: 'O token deve ser passado como parâmetro na URL'})
        }

        let consultation = await Consultation.findOne({where: {token, user_id: req.id}})
        if(!consultation) {
            return res.status(400).json({err: 'Token inválido!'})
        }

        if(typeof(consultation.details.pdf) === 'string') {
            const pdfPath = path.join(__dirname, '..', 'views', consultation.details.pdf);
            return res.sendFile(pdfPath)
        }
        

    } catch (err) {
        return res.status(404).json({ err })
    }
}