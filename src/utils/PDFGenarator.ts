import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Buffer } from 'buffer'
import { medicaAppointmentTP } from "@src/models/medicalAppointment";

export class PDFGenarator{
    public fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        }
    };

    public result!: Buffer;

    public generatePDF(appointDetails:medicaAppointmentTP, owner: string): Buffer{
        const printer = new PdfPrinter(this.fonts);

        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica"},
            content: [
                { text: `${appointDetails.description}`}
            ],
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks: Buffer[] = [

        ];

        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.on("end", () => {
            this.result = Buffer.concat(chunks);
        })

        pdfDoc.end();

        return this.result;
    }
}