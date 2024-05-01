const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

async function generatePdf(appointmentData, userData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, 'pdfTemplate.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const filledHTML = html
    .replace('{{ fullName }}', userData.fullName)
    .replace('{{ email }}', userData.email)
    .replace('{{ birthDate }}', formatDate(userData.birthDate))
    .replace('{{ appointmentDate }}', formatDate(appointmentData.appointmentDate))
    .replace('{{ appointmentTime }}', appointmentData.appointmentTime.slice(0, 5) + 'h')
    .replace('{{ reason }}', appointmentData.reason);

  const modifiedHTML = filledHTML.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, () => {
    const newSrc = `data:image/svg+xml;base64,${fs
      .readFileSync(path.join(__dirname, 'logo.svg'))
      .toString('base64')}`;
    return `<img src="${newSrc}" alt="blue company logo" width="48" height="38" />`;
  });

  await page.setContent(modifiedHTML);

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return pdfBuffer;
}

module.exports = generatePdf;
