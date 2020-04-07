const scenarioController = require('./scenario.controller');
const boardService = require('../../services/board/board.service');
const ScenarioModel = require('../../models/scenario.model');

jest.mock('../../services/board/board.service');

describe('getAllNoFeatureScenarios', () => {
  
  const req = {};
  const res = {
    json: jest.fn()
  }

  let allNoFeatureScenarios = []
  allNoFeatureScenarios.push(new ScenarioModel({name: 'hello'}));

  boardService.getScenarioByFeatureId.mockReturnValue(
    Promise.resolve(allNoFeatureScenarios)
  );

  afterEach(() => {
    res.json.mockClear();
  });

  it('should return scenario with no feature when the id is not given', async() => {
    await scenarioController.getAllNoFeatureScenarios(req, res);
    expect(res.json).toHaveBeenCalledWith(allNoFeatureScenarios)
  });
});