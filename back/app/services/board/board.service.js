const ScenarioModel = require('../../models/scenario.model');
const CodeblockModel = require('../../models/codeblock.model');

const validSectionName = ['Given', 'When', 'Then'];

const BoardService = {
  insertSectionUpdate: async (name, steps, codeBlockId) => {
    if (!validSectionName.includes(name))
      throw new Error('Invalid section name');
    const sectionField = name.toLowerCase() + 'Steps';
    let updatedFileds = {};
    updatedFileds[sectionField] = steps
    return ScenarioModel.findByIdAndUpdate(codeBlockId, updatedFileds);
  },

  insertScenario: async (scenarioData) => {
    const ns = new ScenarioModel(scenarioData);
    return await ns.save();
  },

  updateScenario: (scenarioData, codeBlockId) => {
    return ScenarioModel.findByIdAndUpdate(codeBlockId, scenarioData);
  },

  deleteScenario: (codeBlockId) => {
    return ScenarioModel.findByIdAndDelete(codeBlockId);
  },

  getCodeblocksByFeatureId: (featureId) => {
    return CodeblockModel.find({featureId: featureId});
  } 
}

module.exports = BoardService;