const BoardService = require('../../services/board/board.service');
const ScenarioController = {

  getAllNoFeatureScenarios : async (req, res) => {
    const dbScenarios = await BoardService.getScenarioByFeatureId();
    const formatedScenairos = dbScenarios.map((sc) => {
      sc.codeBlockId = sc._id;
      return sc;
    })
    return res.json(formatedScenairos);
  }
}

module.exports = ScenarioController;