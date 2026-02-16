import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'public/Texto Definitivo - reforma2026.pdf';

async function extractText() {
  try {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = getDocument(data);
    const pdfDocument = await loadingTask.promise;

    console.log(`Total pages: ${pdfDocument.numPages}`);

    for (let i = 1; i <= Math.min(10, pdfDocument.numPages); i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item: any) => item.str).join(' ');
        console.log(`\n--- Page ${i} ---`);
        console.log(textItems.slice(0, 1000));
    }
  } catch (error) {
    console.error('Error extracting text:', error);
  }
}

extractText();
