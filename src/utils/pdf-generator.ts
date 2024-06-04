import PDFDocument from "pdfkit";

interface PDFAppointment {
  user_name: string;
  appointment_date: string;
  appointment_type: string;
  status: string;
  notes: string;
}

export function pdfGenerator({
  user_name,
  appointment_date,
  appointment_type,
  status,
  notes,
}: PDFAppointment): Promise<string | NodeJS.ArrayBufferView> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margins: { top: 50, bottom: 50, left: 72, right: 72 },
      size: "A4",
    });
    let buffers: any[] = [];

    doc.fontSize(20).font("Helvetica-Bold").text("Appointment Details", {
      align: "center",
      underline: true,
      lineGap: 10,
    });

    doc.fontSize(12).font("Helvetica").moveDown();

    doc.text(`Patient: ${user_name}`, {
      lineGap: 5,
    });
    doc.text(`Date: ${appointment_date}`, {
      lineGap: 5,
    });
    doc.text(`Consult type: ${appointment_type}`, {
      lineGap: 5,
    });
    doc.text(`Consult status: ${status}`, {
      lineGap: 5,
    });
    doc.text(`Description: ${notes}`, {
      lineGap: 5,
    });

    doc.moveDown().lineWidth(0.5).rect(doc.x, doc.y, 500, 0).stroke();

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.end();
  });
}
