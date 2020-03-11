const FeatureBoardLoacators = require('../locators/board-feature-locators');
const GherkinGeneratorLoacators = require('../locators/gherkin-generator-locators');

class FeatureBoardHelper {

  constructor(actor) {
    this.actor = actor;
  }
  addScenario(name) {
    this.actor.click(FeatureBoardLoacators.btnAddScenario);
    if(name) {
      this.renameLastScenario(name);
    }
  }

  renameLastScenario(name) {
    this.actor.click(FeatureBoardLoacators.lastScenarioName);
    this.actor.fillField(FeatureBoardLoacators.lastScenarioNameInput, name);
    this.actor.click(FeatureBoardLoacators.lastScenarioNameBtnSave);
  }

  renameScenario(name, position = 1) {
    this.actor.click(FeatureBoardLoacators.scenarioName(position));
    this.actor.fillField(FeatureBoardLoacators.scenarioNameInput(position), name);
    this.actor.click(FeatureBoardLoacators.scenarioNameBtnSave(position));
  }

  deleteScenario(position) {
    this.actor.click(FeatureBoardLoacators.scenarioBtnDel(position));
  }

  addStep(posScenario, sectionName, step) {
    this.actor.fillField(
      FeatureBoardLoacators.scenarioSectionInputStep(posScenario, sectionName),
      step
    );
    this.actor.pressKey("Enter");
  }

  renameFeature(name) {
    this.actor.click(FeatureBoardLoacators.featureName);
    this.actor.fillField(FeatureBoardLoacators.featureNameInput, name);
    this.actor.click(FeatureBoardLoacators.featureNameBtnSave);
  }

  generateGherkinCode() {
    this.actor.click(GherkinGeneratorLoacators.btnGenerateGherkin)
  }
}

module.exports = FeatureBoardHelper;