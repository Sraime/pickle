import { TestBed } from '@angular/core/testing';

import { ScenarioUpdaterService } from './scenario-updater.service';
import { ScenarioUpdateData } from '../../../interfaces/scenario-update-data.interface';
import { EventUpdateType } from '../../../libs/EventUpdateType.enums';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';
import { Subject } from 'rxjs';

jest.mock('../../boardSynchronizer/board-socket-synchro.service');

describe('ScenarioUpdaterService', () => {
	const mockSocketSynchroService: jest.Mocked<BoardSocketSynchro> = new BoardSocketSynchro() as jest.Mocked<
		BoardSocketSynchro
	>;
	let service: ScenarioUpdaterService;
	const scenarioUpdateTypeCreate: ScenarioUpdateData = {
		name: 'test',
		codeBlockId: 'xx',
		updateType: EventUpdateType.CREATE
	};
	const subjectSynchroEvent: Subject<ScenarioUpdateData> = new Subject<ScenarioUpdateData>();

	mockSocketSynchroService.getScenarioUpdateObservable.mockReturnValue(subjectSynchroEvent);
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: BoardSocketSynchro,
					useValue: mockSocketSynchroService
				}
			]
		})
	);

	beforeEach(() => {
		service = TestBed.get(ScenarioUpdaterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should dispatch the event when the synchro service dispatch one', (done) => {
		service.getObservable().subscribe((data) => {
			expect(data).toEqual(scenarioUpdateTypeCreate);
			done();
		});
		subjectSynchroEvent.next(scenarioUpdateTypeCreate);
	});

	describe('synchro enabled', () => {
		beforeAll(() => {
			mockSocketSynchroService.synchonizationEnabled.mockReturnValue(true);
		});

		it('should dispatch to the synchroniser', () => {
			service.updateData(scenarioUpdateTypeCreate);
			expect(mockSocketSynchroService.dispatchScenarioUpdate).toHaveBeenCalledWith(
				scenarioUpdateTypeCreate
			);
		});
	});

	describe('synchro enabled', () => {
		beforeAll(() => {
			mockSocketSynchroService.synchonizationEnabled.mockReturnValue(false);
		});

		it('should dispatch localy when the synchronisation is disabled', (done) => {
			service.getObservable().subscribe((data) => {
				expect(data).toEqual(scenarioUpdateTypeCreate);
				done();
			});
			service.updateData(scenarioUpdateTypeCreate);
		});
	});
});
