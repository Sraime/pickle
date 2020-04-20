const BoardService = require('../../services/board/board.service');
const FeatureService = require('../../services/feature/feature.service');

const BoardEvents = {
  sectionUpdate: (server, sectionData) => {
    BoardService.insertSectionUpdate(sectionData.name, sectionData.steps, sectionData.codeBlockId)
    .then(() => { server.io.to(server.featureId).emit('section-update', sectionData) })
    .catch((e) => {})
  },
  
  scenarioUpdate: (server, scenarioData) => {
    let serviceResult;
    switch(scenarioData.updateType) {
      case 'CREATE' : serviceResult = BoardService.insertScenario({
        name: scenarioData.name,
        featureId: server.featureId
      }); break;
      case 'UPDATE' : serviceResult = BoardService.updateScenario({
        name: scenarioData.name,
        featureId: server.featureId
      }, scenarioData.codeBlockId); break;
      case 'DELETE' : serviceResult = BoardService.deleteScenario(scenarioData.codeBlockId); break;
      default: throw new Error('updateType is not specified');
    } 
    serviceResult
      .then((saved) => { 
        scenarioData.codeBlockId = saved._id;
        server.io.to(server.featureId).emit('scenario-update', scenarioData)
      })
      .catch((e) => {})
  },

  featureUpdate: (server, featureData) => {
    FeatureService.updateFeature(server.featureId,featureData)
    .then(() => { server.io.to(server.featureId).emit('feature-update', featureData) })
    .catch((e) => {})
  }

}

module.exports = BoardEvents;