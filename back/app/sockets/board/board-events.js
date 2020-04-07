const BoardService = require('../../services/board/board.service');

const BoardEvents = {
  sectionUpdate: (server, sectionData) => {
    BoardService.insertSectionUpdate(sectionData.name, sectionData.steps, sectionData.codeBlockId)
    .then(() => { server.io.emit('section-update', sectionData) })
    .catch((e) => {})
  },
  
  scenarioUpdate: (server, scenarioData) => {
    let serviceResult;
    switch(scenarioData.updateType) {
      case 'CREATE' : serviceResult = BoardService.insertScenario(scenarioData.name); break;
      case 'UPDATE' : serviceResult = BoardService.updateScenario(scenarioData.name, scenarioData.codeBlockId); break;
      case 'DELETE' : serviceResult = BoardService.deleteScenario(scenarioData.codeBlockId); break;
      default: throw new Error('updateType is not specified');
    } 
    serviceResult
      .then((saved) => { 
        scenarioData.codeBlockId = saved._id;
        server.io.emit('scenario-update', scenarioData)
      })
      .catch((e) => {})
  }

}

module.exports = BoardEvents;