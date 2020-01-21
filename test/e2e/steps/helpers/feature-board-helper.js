const FeatureBoardLoacators = require('../locators/board-feature-locators');

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

  deleteScenario(position) {
    this.actor.click(FeatureBoardLoacators.scenarioBtnDel(position));
  }

  addStep(posScenario, sectionName, step) {
    this.actor.fillField(
      FeatureBoardLoacators.scenarioSectionInputStep(posScenario, sectionName),
      step
    );
  }
}

module.exports = FeatureBoardHelper;