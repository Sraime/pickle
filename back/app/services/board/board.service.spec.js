const BoardService = require('./board.service');
const ScenarioModel = require('../../models/scenario.model')

describe('BoardService', () => {

  const simpleSavedModel =  new ScenarioModel({name: 'hello'});
  
  let mockSaveScenario;
  let mockFindByIdUpdateScenario;
  let mockFindByIdDeleteScenario;

  beforeEach(() => {
    mockSaveScenario = jest.spyOn(ScenarioModel.prototype, 'save');
    mockFindByIdUpdateScenario = jest.spyOn(ScenarioModel, 'findByIdAndUpdate');
    mockFindByIdDeleteScenario = jest.spyOn(ScenarioModel, 'findByIdAndDelete');
  });

  afterEach(() => {
    mockSaveScenario.mockClear();
    mockFindByIdUpdateScenario.mockClear();
    mockFindByIdDeleteScenario.mockClear();
  });

  describe('insertScenario()', () => {

    it('should create and save the scenario', async() => {
      mockSaveScenario.mockReturnValue(simpleSavedModel)
      const result  = await BoardService.insertScenario({name: simpleSavedModel.name});
      expect(result).toEqual(simpleSavedModel)
    });
  });

  describe('updateScenario()', () => {

    it('should update the existing scenario', async() => {
      const updatedScenario =  new ScenarioModel({name: 'updated'});
      mockFindByIdUpdateScenario.mockReturnValue(updatedScenario)
      const result  = await BoardService.updateScenario('updated', updatedScenario.id);
      expect(mockFindByIdUpdateScenario).toHaveBeenCalled();
      expect(result).toEqual(updatedScenario)
    });
  });

  describe('deleteScenario()', () => {

    it('should delete the existing scenario', async() => {
      mockFindByIdDeleteScenario.mockReturnValue(Promise.resolve());
      await BoardService.deleteScenario(simpleSavedModel._id);
      expect(mockFindByIdDeleteScenario).toHaveBeenCalledWith(simpleSavedModel._id);
    });
  });

  describe('insertSectionUpdate()', () => {

    it('should return an error when the section name is not valid', (done) => {
      BoardService.insertSectionUpdate('HELLO', [], 'xxx')
        .catch((error) => {
          expect(error.message).toEqual('Invalid section name');
          done();
        });
    });

    const validSectionNames = ['Given', 'When', 'Then'];
    validSectionNames.forEach((sn) => {

      it('should update the section '+ sn +' of an existing scenario', async() => {
        const sectionField = sn.toLowerCase()+'Steps';
        let baseScenrio = {}
        baseScenrio[sectionField] = {name: 'step1'}
        const updatedScenario =  new ScenarioModel(baseScenrio);
        mockFindByIdUpdateScenario.mockReturnValue(updatedScenario)
        const result  = await BoardService.insertSectionUpdate(sn, [], 'xxx');
        expect(result).toEqual(updatedScenario);
      })

    })
  });
});