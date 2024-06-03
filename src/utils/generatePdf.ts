import path from "path";
import pdf from 'html-pdf'
import { renderHtml } from "./renderHtml";

interface DataPdf {
    user_id: number | undefined,
    username: string,
    doctorName: string,
    consultationTime: string,
    consultationDate: string,
    speciality: string
}

export const generatePDF = async (data: DataPdf): Promise<string | Error> => {
    try {
        let { username, doctorName, consultationTime, consultationDate, speciality } = data
        let randomNumber = Math.floor(Math.random() * 1000000)
        const html = await renderHtml({ username, doctorName, consultationTime, consultationDate, speciality })

        pdf.create(html, {}).toFile(path.join(__dirname, `../views/consultations/${username.replace(/\s+/g, '')}_${data.user_id}/${username.replace(/\s+/g, '')}_${doctorName.replace(/\s+/g, '')}_consulta_${randomNumber}.pdf`), (err, res) => {
            if (err) {
                return new Error(err.message)
            } else {
                console.log(res)
            }
        })

        let file = `/consultations/${data.username.replace(/\s+/g, '')}_${data.user_id}/${data.username.replace(/\s+/g, '')}_${data.doctorName.replace(/\s+/g, '')}_consulta_${randomNumber}.pdf`
        return file

    } catch (err: any) {
        throw new Error(err.message)
    }

}