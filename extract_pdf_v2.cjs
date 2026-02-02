const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const text = pdfParser.getRawTextContent();
    fs.writeFileSync("extracted_text.txt", text);
    console.log("Text extracted to extracted_text.txt");
});

pdfParser.loadPDF("docs/TELEFONES FÓRUNS E OAB DA REGIÃO - VALE DO RIBEIRA (2) (1).pdf");
