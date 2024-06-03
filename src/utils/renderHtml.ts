import ejs from 'ejs'
import path from 'path'
import { promisify } from 'util'

interface HtmlData {
    username: string,
    doctorName: string,
    consultationTime: string,
    consultationDate: string,
    speciality: string
}

const renderFileAsync = promisify<string, object, string>(ejs.renderFile);

export const renderHtml = async ({ username, doctorName, consultationTime, consultationDate, speciality }: HtmlData): Promise<string> => {
    try {
        const html = await renderFileAsync(path.join(__dirname, '../views/pdf.ejs'), { username, doctorName, consultationTime, consultationDate, speciality });
        return html;
    } catch (err) {
        throw new Error('Error rendering EJS');
    }
};



