const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('docs/TELEFONES FÓRUNS E OAB DA REGIÃO - VALE DO RIBEIRA (2) (1).pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('extracted_text.txt', data.text);
    console.log('Text extracted to extracted_text.txt');
}).catch(err => {
    console.error('Error extracting PDF:', err);
});
