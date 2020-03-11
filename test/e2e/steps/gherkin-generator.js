const I = actor();
const fs = require('fs');
const assert = require('assert');
const GherkinGeneratorLocators = require('./locators/gherkin-generator-locators');


When('je demande la generation du code gherkin', () => {
  I.click(GherkinGeneratorLocators.btnGenerateCode)
});

Then('le code gherkin généré est :', (code) => {
  I.see(code.content,'.generated-feature-code')
});

When('je demande l\'export du code gherkin généré', () => {
  I.handleDownloads();
  I.click(GherkinGeneratorLocators.btnDownloadCode);
});

Then('le fichier {string} est téléchargé et contient le code suivant :', (fileName, expectedCode) => {
  const fileContent = fs.readFileSync(__dirname+'/../output/downloads/'+fileName);
  assert.equal(fileContent.toString(), expectedCode.content);
});