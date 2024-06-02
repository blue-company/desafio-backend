import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Buffer } from 'buffer'
import { medicaAppointmentTP } from "../models/medicalAppointment";

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
        const date = this.formatDate(appointDetails.data);

        const printer = new PdfPrinter(this.fonts);

        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica"},
            content: [
                {
                        stack: [
                        'Medical Appointment \n ',
                        {text: appointDetails.name + " \n \n \n", style: "subheader"}
            
                        ], 
                        style: 'header',
                        alignment: "center"
                },
                {
                    columns: [
                        {text: "Status:", alignment: "right", bold: true},
                        {text: appointDetails.status + " \n \n \n \n", width: "auto", margin: [10, 0, 0, 0]},
                        
                        ],
                        alignment: "right",
                        
                },
                {
                    columns: [
                        { 
                            columns:[
                                {text: "Nome of pacient: ", bold: true, width: "auto", margin: [0, 0, 10, 0]},
                                {text: owner},
                             ],
                             alignment: "left",
                             
                            
                        },
                         
                         {
                             columns: [
                                 {text: "Date of appointment: \n \n \n", bold: true},
                                 {text: date, width: "auto", margin: [10, 0, 0, 0]}
                                 ],
                                 alignment: "right"
                         }
                        ],
                },
                
                {
                    columns: [
                        {text: "Description: ", width: "auto", margin: [0, 0, 10, 0], bold: true},
                        {text: `${appointDetails.description}`}
                        ]
                }
                
                
                ],
                styles: {
                    header: {
                        fontSize: 25,
                        bold: true,
                        alignment: 'justify'
                    },
                    subheader: {
                        fontSize: 20,
                        bold: true, 
                    }
                }
            
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

    public formatDate = (isoString: string): string =>  {
        const date = new Date(isoString);
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
}