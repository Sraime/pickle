const LocatorsExporter = require("./locators-exporter");

const CssLocators = {
  lastScenario: ".scenario-builder-card:nth-last-child(1)",
  featureHeader: ".feature-header",
  backgroundSection: "background-builder .section-steps-given",
  scenarioPosition: (position) => {
    const codeblockPosition = parseInt(position, 10) + 1; // +1 for skiping the background
    return ".scenario-builder-card:nth-child(" + codeblockPosition + ")";
  },
  scenarioSection: function (posScenario, sectionName) {
    return (
      CssLocators.scenarioPosition(posScenario) +
      " .section-steps-" +
      sectionName.toLowerCase()
    );
  },
};

module.exports = {
  btnAddScenario: LocatorsExporter.cssLocator(".btn-add-scenario"),

  featureName: LocatorsExporter.cssLocator(
    CssLocators.featureHeader + " .feature-name .editable-text"
  ),
  featureNameInput: LocatorsExporter.cssLocator(
    CssLocators.featureHeader + " .input-edit-text"
  ),
  featureNameBtnSave: LocatorsExporter.cssLocator(
    CssLocators.featureHeader + " .btn-save-text"
  ),

  scenarioName: (position) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioPosition(position) + " .codeblock-name"
    );
  },
  scenarioNameInput: (position) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioPosition(position) + " .input-edit-text"
    );
  },
  scenarioNameBtnSave: (position) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioPosition(position) + " .btn-save-text"
    );
  },

  lastScenarioName: LocatorsExporter.cssLocator(
    CssLocators.lastScenario + " .codeblock-name"
  ),
  lastScenarioNameInput: LocatorsExporter.cssLocator(
    CssLocators.lastScenario + " .input-edit-text"
  ),
  lastScenarioNameBtnSave: LocatorsExporter.cssLocator(
    CssLocators.lastScenario + " .btn-save-text"
  ),

  scenarioBtnDel: (position) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioPosition(position) + " .btn-del-codeblock"
    );
  },

  scenarioSectionInputStep: (posScenario, section) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioSection(posScenario, section) +
        " input.input-new-step"
    );
  },

  backgroundInputStep: LocatorsExporter.cssLocator(
    CssLocators.backgroundSection + " input.input-new-step"
  ),

  scenarioSection: (posScenario, section) => {
    return LocatorsExporter.cssLocator(
      CssLocators.scenarioSection(posScenario, section)
    );
  },

  backgroundSection: LocatorsExporter.cssLocator(CssLocators.backgroundSection),
};
