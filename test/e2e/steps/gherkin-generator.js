const I = actor();
const GherkinGeneratorLocators = require('./locators/gherkin-generator-locators');

When('je demande la generation du code gherkin', () => {
  I.click(GherkinGeneratorLocators.btnGenerateCode)
});

Then('le code gherkin généré est :', (code) => {
  I.see(code.content,'.generated-feature-code')
});