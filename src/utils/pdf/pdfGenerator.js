const puppeteer = require("puppeteer");
const { getTemplate } = require("./templateHtml");

async function generatePDF(data) {
  const htmlTemplate = getTemplate(data);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlTemplate);
  await page.emulateMediaType("screen");

  const pdfOptions = {
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
  };

  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();
  return pdfBuffer;
}

module.exports = { generatePDF };
