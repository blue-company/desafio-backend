import path from "path";
import ejs from 'ejs';
import pdf from 'html-pdf'
import crypto from 'crypto'


export const generatePDF= async (user_id: number | undefined, username: string, doctorName: string, consultationTime: string, consultationDate: string, speciality: string): Promise <string | Error>  => {
    try {
        let randomNumber = Math.floor(Math.random() * 1000000)
         ejs.renderFile(path.join(__dirname,'../views/pdf.ejs'), {username, doctorName, consultationTime, consultationDate, speciality},  (err, html) => {
            if(err) {
                 return new Error('Error rendering EJS');
            } else {
                console.log(html)
                pdf.create(html, {}).toFile(path.join(__dirname, `../views/consultations/${username.replace(/\s+/g, '')}-${user_id}/${username.replace(/\s+/g, '')}_${doctorName.replace(/\s+/g, '')}_consulta_${randomNumber}.pdf`), (err, res) => {
                    if(err) {
                        return new Error(err.message)
                    } else {
                        console.log(res)
                    }
                })
            }})

            let file = `/consultations/${username.replace(/\s+/g, '')}-${user_id}/${username.replace(/\s+/g, '')}_${doctorName.replace(/\s+/g, '')}_consulta_${randomNumber}.pdf`
            return file

    } catch(err: any) {
        return new Error(err.message)
    }
}

export const generateToken = (length: number) => {
    return crypto.randomBytes(length).toString('hex')
}



