const BoardEvent = require('../board/board-events');
const BoardService = require('../../services/board/board.service');
const ScenarioModel = require('../../models/scenario.model');

jest.mock('../../services/board/board.service');

describe('BoardEvent', () => {

  const mockServer = {
    io: {
      emit: jest.fn()
    }
  }

  describe('sectionUpdate()', () => {
    const fakeValidSectionUpdate = {
      name: 'Given',
      codeBlockId: 'xxxx',
      steps: []
    } 

    const insertPromise = Promise.resolve();

    beforeEach(() => {
      BoardService.insertSectionUpdate.mockReturnValue(insertPromise);
    });
    
    afterEach(() => {
      mockServer.io.emit.mockClear();
      BoardService.insertSectionUpdate.mockClear();
    });
    
    it('should broadcast the section update', (done) => {
      BoardEvent.sectionUpdate(mockServer, fakeValidSectionUpdate);
      insertPromise.then(() => {
        expect(mockServer.io.emit).toHaveBeenCalledWith('section-update',fakeValidSectionUpdate);
        done();
      })
    });
    
    it('should save the section update', () => {
      BoardEvent.sectionUpdate(mockServer, fakeValidSectionUpdate);
      expect(BoardService.insertSectionUpdate).toHaveBeenCalled();
    })
    
    it('should not broadcast the update when service return an error', (done) => {
      const insertErrorPromise = Promise.reject();
      BoardService.insertSectionUpdate.mockReturnValue(insertErrorPromise);
      BoardEvent.sectionUpdate(mockServer, {});
      insertErrorPromise.catch(() => {
        expect(mockServer.io.emit).toHaveBeenCalledTimes(0);
        done();
      })
    });
  });

  describe('scenarioUpdate()', () => {

    it('should throw an error when the updateType is not defined', () => {
      expect(() => BoardEvent.scenarioUpdate(mockServer, {})).toThrowError('updateType is not specified');
    })
    
    const UpdateTypeActions = [
      {
        type: 'CREATE',
        serviceActionName: 'insertScenario'
      },
      {
        type: 'UPDATE',
        serviceActionName: 'updateScenario'
      },
      {
        type: 'DELETE',
        serviceActionName: 'deleteScenario'
      }
    ]

    UpdateTypeActions.forEach((updateTypeAction) => {

      const fakeValidScenarioUpdate = {
        name: 'S1',
        codeBlockId: 'xxx',
        updateType: updateTypeAction.type
      } 
      const fakeReturnedBoardServiceValue = new ScenarioModel({name: fakeValidScenarioUpdate.name})
      const servicePromise = Promise.resolve(fakeReturnedBoardServiceValue);

      beforeEach(() => {
        BoardService[updateTypeAction.serviceActionName].mockReturnValue(servicePromise);
      });
      
      afterEach(() => {
        mockServer.io.emit.mockClear();
        BoardService[updateTypeAction.serviceActionName].mockClear();
      });

      it('should broadcast the scenario update', (done) => {
        BoardEvent.scenarioUpdate(mockServer, fakeValidScenarioUpdate);
        servicePromise.then(() => {
          expect(mockServer.io.emit).toHaveBeenCalledWith('scenario-update',{
            name: fakeValidScenarioUpdate.name,
            updateType: fakeValidScenarioUpdate.updateType,
            codeBlockId: fakeReturnedBoardServiceValue._id
          });
          done();
        })
      });
      
      it('should insert the scenario when the UpdateType is ' + updateTypeAction.type, () => {
        BoardEvent.scenarioUpdate(mockServer, fakeValidScenarioUpdate);
        expect(BoardService[updateTypeAction.serviceActionName]).toHaveBeenCalled();
      })
      
      it('should not broadcast the update type '+updateTypeAction.type+' when the service return an error', (done) => {
        const serviceErrorPromise = Promise.reject();
        BoardService[updateTypeAction.serviceActionName].mockReturnValue(serviceErrorPromise);
        BoardEvent.scenarioUpdate(mockServer, {updateType: updateTypeAction.type});
        serviceErrorPromise.catch(() => {
          expect(mockServer.io.emit).toHaveBeenCalledTimes(0);
          done();
        })
      });
    })
  });
});