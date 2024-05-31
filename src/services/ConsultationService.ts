import { isDate, isTime } from "validator";
import { Doctor } from "../models/Doctor";
import { Consultation } from "../models/Consultation";
import { generateToken } from "../utils/generateRandomToken";
import { generatePDF } from "../utils/generatePdf";

export const validateConsultation = (consultationDate: string, consultationTime: string, doctor_id: number) => {
    if (!consultationDate || !consultationTime || !doctor_id) {
        throw new Error('Preencha todos os campos para agendar a consulta!');
    }

    if (!isDate(consultationDate, { delimiters: ['/'] })) {
        throw new Error('Data inválida');

    }

    if (!isTime(consultationTime, { hourFormat: 'hour24', mode: 'default' })) {
        throw new Error('Horário inválido');
    }
};

export const getDoctorById = async (doctor_id: number) => {
    let doctor = await Doctor.findByPk(doctor_id)
    if (!doctor) {
        throw new Error('Médico não encontrado');
    }

    return doctor
}

export const checkExistingConsultation = async (consultationDate: string, consultationTime: string, doctor_id: number, doctor_name: string) => {
    let hasConsultation = await Consultation.findOne({ where: { consultationDate, consultationTime, doctor_id } })

    if (hasConsultation) {
        throw new Error(`Já existe uma consulta marcada com o Dr. ${doctor_name} para esse horário`)
    }
}

export const createConsultation = async (data: any) => {
    return await Consultation.create(data)
}

export const generateConsultationToken = () => {
    return generateToken(16)
}

export const createConsultationPDF = async (userId: number, username: string, doctorName: string, consultationTime: string, formattedDate: string, doctorSpeciality: string) => {
    return await generatePDF(userId, username, doctorName, consultationTime, formattedDate, doctorSpeciality)
}

export const findConsultations = async (user_id: number, username: string) => {
    let consultations = await Consultation.findAll({ where: { user_id } })
    if (!consultations || consultations.length === 0) {
        throw new Error(`Não foi encontrado um histórico de consultas para o usuário ${username}`)
    }

    return consultations
}

export const findConsultation = async (token: string, user_id: number) => {
    if (!token) {
        throw new Error(`O token deve ser passado como parâmetro na URL`)
    }

    let consultation = await Consultation.findOne({ where: { token, user_id } })
    if (!consultation) {
        throw new Error(`Token inválido!`)
    }

    return consultation
}