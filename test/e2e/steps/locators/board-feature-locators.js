const cssLocator = (css) => {
  return {css: css};
} 

const xpathLocator = (xpath) => {
  return {xpath: xpath};
} 

const CssLocators = {
  lastScenario: '.scenario-builder-card:nth-last-child(2)',
  scenarioPosition: (position) => { 
    return '.scenario-builder-card:nth-child(' + position + ')' 
  },
  scenarioSection: function (posScenario, sectionName) {
    return CssLocators.scenarioPosition(posScenario) 
      + ' .section-steps-' + sectionName.toLowerCase();
},
}

module.exports = {

  btnAddScenario: cssLocator('.btn-add-scenario'),

  scenarioName: (position) => {
    return cssLocator('.scenario-builder-card:nth-child(' + position + ') .scenario-name');
  },

  lastScenarioName: cssLocator(CssLocators.lastScenario + ' .scenario-name'),
  lastScenarioNameInput: cssLocator(CssLocators.lastScenario + ' .input-edit-scenario-name'),
  lastScenarioNameBtnSave: cssLocator(CssLocators.lastScenario + ' .btn-save-scenario-name'),

  scenarioBtnDel: (position) => {
    return cssLocator(CssLocators.scenarioPosition(position) 
      + ' .btn-del-scenario');
  },

  scenarioSectionInputStep: (posScenario, section) => {
    return cssLocator(CssLocators.scenarioSection(posScenario, section) 
      + ' input.input-new-step');
  },

  scenarioSection: (posScenario, section) => {
    return cssLocator(CssLocators.scenarioSection(posScenario, section));
  },
  
}