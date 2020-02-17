const LocatorsExporter = require('./locators-exporter');

module.exports = {
  btnGenerateCode: LocatorsExporter.cssLocator('.btn-generate-code'),
  btnGenerateCodeEnabled: LocatorsExporter.cssLocator('.btn-generate-code:not(:disabled)'),
  btnGenerateCodeDisabled: LocatorsExporter.cssLocator('.btn-generate-code:disabled')
} 