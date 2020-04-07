const ScenarioModel = require('../../models/scenario.model');

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

  insertScenario: async (name) => {
    const ns = new ScenarioModel({name: name});
    return await ns.save();
  },

  updateScenario: (name, codeBlockId) => {
    return ScenarioModel.findByIdAndUpdate(codeBlockId, {name: name});
  },

  deleteScenario: (codeBlockId) => {
    return ScenarioModel.findByIdAndDelete(codeBlockId);
  },

  getScenarioByFeatureId: (featureId) => {
    return ScenarioModel.find({});
  } 
}

module.exports = BoardService;