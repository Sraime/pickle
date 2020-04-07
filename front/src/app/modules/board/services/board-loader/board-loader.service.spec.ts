import { TestBed } from '@angular/core/testing';

import { BoardLoaderService } from './board-loader.service';
import { ScenarioService } from '../scenario/scenario.service';
import { ApiScenario } from '../scenario/api-scenario.interface';
import { of } from 'rxjs';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionServiceService } from '../updaters/section-service/section-service.service';
import { SectionModel } from '../../models/section.model';

jest.mock('../scenario/scenario.service');
jest.mock('../updaters/scenario-updater/scenario-updater.service');
jest.mock('../updaters/section-service/section-service.service');

describe('BoardLoaderService', () => {
	let service: BoardLoaderService;
	const mockScenarioService: jest.Mocked<ScenarioService> = new ScenarioService(
		null
	) as jest.Mocked<ScenarioService>;
	const mockScenarioUpdater: jest.Mocked<ScenarioUpdaterService> = new ScenarioUpdaterService(
		null
	) as jest.Mocked<ScenarioUpdaterService>;
	const mockSectionUpdater: jest.Mocked<SectionServiceService> = new SectionServiceService(
		null,
		null
	) as jest.Mocked<SectionServiceService>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScenarioService,
					useValue: mockScenarioService
				},
				{
					provide: ScenarioUpdaterService,
					useValue: mockScenarioUpdater
				},
				{
					provide: SectionServiceService,
					useValue: mockSectionUpdater
				}
			]
		});
		service = TestBed.inject(BoardLoaderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('loadFeature()', () => {
		const apiScenarios: ApiScenario[] = [
			{
				_id: 'xxx',
				name: 's1',
				givenSteps: [{ name: 'step1' }],
				whenSteps: [{ name: 'step2' }],
				thenSteps: [{ name: 'step3' }]
			},
			{
				_id: 'yyy',
				name: 's2',
				givenSteps: [],
				whenSteps: [],
				thenSteps: []
			}
		];

		beforeEach(() => {
			mockScenarioService.getScenariosFeature.mockReturnValue(of(apiScenarios));
		});

		afterEach(() => {
			mockScenarioService.getScenariosFeature.mockClear();
			mockScenarioUpdater.updateData.mockClear();
			mockSectionUpdater.updateSection.mockClear();
		});

		it('should request the scenario service', () => {
			service.loadFeature();
			expect(mockScenarioService.getScenariosFeature).toHaveBeenCalled();
		});

		it('should update the scenario returned by the service through the scenario updater', async () => {
			mockScenarioService.getScenariosFeature.mockReturnValue(of([apiScenarios[0]]));
			await service.loadFeature();
			const expectedUpdate: ScenarioUpdateData = {
				name: apiScenarios[0].name,
				codeBlockId: apiScenarios[0]._id,
				updateType: EventUpdateType.CREATE
			};
			expect(mockScenarioUpdater.updateData).toHaveBeenCalledWith(expectedUpdate);
		});

		it('should update all scenarios returned by the service through the scenario updater', async () => {
			await service.loadFeature();
			expect(mockScenarioUpdater.updateData).toHaveBeenCalledTimes(2);
		});

		it('should update all section for each returned scenario returned by the service', async () => {
			await service.loadFeature();
			expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith(
				new SectionModel('Given', apiScenarios[0]._id, apiScenarios[0].givenSteps)
			);
			expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith(
				new SectionModel('When', apiScenarios[0]._id, apiScenarios[0].whenSteps)
			);
			expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith(
				new SectionModel('Then', apiScenarios[0]._id, apiScenarios[0].thenSteps)
			);
		});

		it('should not update empty section for scenarios returned by the service', async () => {
			await service.loadFeature();
			expect(mockSectionUpdater.updateSection).toHaveBeenCalledTimes(3);
		});
	});
});
