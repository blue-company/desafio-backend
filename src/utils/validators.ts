import { isDate, isTime } from "validator";
import isEmail from "validator/lib/isEmail";

export const isValidDate = (date: string | undefined) => {
    if (date && !isDate(date, { delimiters: ['/'] })) {
        throw new Error('Data inválida');
    }
}

export const isValidTime = (time: string | undefined) => {
    if (time && !isTime(time, { hourFormat: 'hour24', mode: 'default' })) {
        throw new Error('Horário inválido');
    }
}

export const isValidConsultation = (consultationDate: string, consultationTime: string, doctor_id: number) => {
    if (!consultationDate || !consultationTime || !doctor_id) {
        throw new Error('Preencha todos os campos para agendar a consulta!');
    }

    isValidDate(consultationDate)
    isValidTime(consultationTime)
};


export const isValidEmail = (email: string) => {
    if(!isEmail(email)) {
        throw new Error(`Email inválido"`)
    }
}