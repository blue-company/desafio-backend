import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { Consult } from '@prisma/client';

export function createPdf(consult: Consult): Promise<string> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      
      const filePath = path.join(__dirname, 'consulta.pdf');
      const writeStream = fs.createWriteStream(filePath);
      

      doc.pipe(writeStream);
      doc.fontSize(20).text('Consulta Médica', { align: 'center' }).moveDown(0.5);

      doc.fontSize(14).text(`Doutor: ${consult.doctor}`).moveDown(0.5);
      doc.text(
        `Data da Consulta: ${consult.dateRequest.getUTCDate()}/${consult.dateRequest.getMonth()}/${consult.dateRequest.getFullYear()} às ${consult.dateRequest.getHours()}:${consult.dateRequest.getMinutes()} Horas`
      ).moveDown(0.5);
      doc.text(`Observações: ${consult.observation}`).moveDown(0.5);

      doc.fontSize(20).text(`Protocolo: ${consult.protocol}`, { align: 'center' }).moveDown(0.5);

      
      doc.end();
      
      writeStream.on('finish', () => {
        resolve(filePath);
      });
      
      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }