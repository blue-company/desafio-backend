const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePdf = async (appointments, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    // Cria o diretório se ele não existir
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    doc.pipe(stream);

    // Define o tamanho do logotipo
    const logoWidth = 100;
    const logoHeight = 50;

    // Define a cor da header
    doc.fillColor('#f2f2f2');

    // Desenha a header
    doc.rect(0, 0, doc.page.width, 50).fill();

    // Desenha o logotipo
    const logoX = 50; // Posição X do logotipo
    const logoY = 10; // Posição Y do logotipo
    doc.rect(logoX, logoY, logoWidth, logoHeight).fill('#007bff');
    doc.fillColor('white').fontSize(20).text('Logo', logoX + 10, logoY + 15);

    // Nome da empresa com estilo destacado
    const companyNameX = logoX + logoWidth + 20; // Posição X do nome da empresa
    const companyNameY = logoY + 15; // Posição Y do nome da empresa
    doc.fillColor('black').font('Helvetica-Bold').fontSize(30).text('Blue Company', companyNameX, companyNameY);

    // Define a fonte do título "Detalhes da Consulta"
    doc.font('Helvetica-Bold').fontSize(20);

    // Título "Detalhes da Consulta"
    const titleWidth = doc.widthOfString('Detalhes da Consulta');
    const startXTitle = (doc.page.width - titleWidth) / 2;
    doc.text('Detalhes da Consulta', startXTitle, doc.y).moveDown(0.5);

    // Define a fonte e o tamanho do texto para os campos de dados
    doc.font('Helvetica').fontSize(12);

    // Coordenadas iniciais do retângulo
    const startX = 50;
    let startY = doc.y;
    let height = 20 * 6 + 50; // Altura do retângulo, incluindo espaçamento entre os campos

    // Desenha o retângulo em volta de todos os campos
    doc.rect(startX, startY, 500, height).stroke();

    // Define a cor do texto para os campos de dados
    doc.fillColor('black');

    // Define o estilo do texto
    const textOptions = { width: 500, align: 'left' };

    // Paciente
    let textY = startY + 20; // Posição do texto "Paciente"
    doc.text(`Paciente: ${appointments.user.dataValues.name}`, startX + 10, textY, textOptions);
    
    // Data
    textY += 20; // Posição do texto "Data"
    doc.text(`Data: ${appointments.date}`, startX + 10, textY, textOptions);

    // Local
    textY += 20; // Posição do texto "Local"
    doc.text(`Local: rua avenida blue company, 173`, startX + 10, textY, textOptions);

    // Horário
    textY += 20; // Posição do texto "Horário"
    doc.text(`Horário: 10:00`, startX + 10, textY, textOptions);

    // Médico
    textY += 20; // Posição do texto "Médico"
    doc.text(`Médico: ${appointments.doctor}`, startX + 10, textY, textOptions);

    // Descrição
    textY += 20; // Posição do texto "Descrição"
    doc.text(`Descrição: ${appointments.description}`, startX + 10, textY, textOptions);

    // Define a cor e a fonte do footer
    doc.fillColor('black').font('Helvetica').fontSize(10);

    // Informações do footer
    const footerText = 'Endereço: Rua ABC, 123 - Cidade, Estado | Telefone: (12) 3456-7890 | SAC: 0800 123 4567';

    // Calcula a altura do texto do footer
    const footerTextHeight = doc.heightOfString(footerText, { width: 500, align: 'left' });

    // Desenha o footer
    const footerY = doc.page.height - footerTextHeight - 83; // Posição Y do footer
    doc.text(footerText, startX, footerY, { width: 500, align: 'left' });

    // Finaliza o PDF
    doc.end();

    // Eventos de conclusão e erro do stream
    stream.on('finish', () => {
      resolve(filePath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = generatePdf;
