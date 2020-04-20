import { TestBed } from '@angular/core/testing';

import { BoardLoaderService } from './board-loader.service';
import { FeatureService } from '../api/feature/feature.service';
import { ScenarioService } from '../api/scenario/scenario.service';
import { ApiScenario } from '../api/scenario/api-scenario.interface';
import { of } from 'rxjs';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionUpdaterService } from '../updaters/section-updater/section-updater.service';
import { SectionModel } from '../../models/section.model';
import { ApiFeature } from '../api/feature/api-feature.interface';
import { FeatureUpdaterService } from '../updaters/feature-updater/feature-updater.service';
import { FeatureUpdateData } from '../../interfaces/feature-update-data.interface';

jest.mock('../api/feature/feature.service');
jest.mock('../api/scenario/scenario.service');
jest.mock('../updaters/scenario-updater/scenario-updater.service');
jest.mock('../updaters/section-updater/section-updater.service');
jest.mock('../updaters/feature-updater/feature-updater.service');

describe('BoardLoaderService', () => {
	let service: BoardLoaderService;
	const mockFeatureService: jest.Mocked<FeatureService> = new FeatureService(null) as jest.Mocked<
		FeatureService
	>;
	const mockScenarioService: jest.Mocked<ScenarioService> = new ScenarioService(
		null
	) as jest.Mocked<ScenarioService>;
	const mockScenarioUpdater: jest.Mocked<ScenarioUpdaterService> = new ScenarioUpdaterService(
		null
	) as jest.Mocked<ScenarioUpdaterService>;
	const mockSectionUpdater: jest.Mocked<SectionUpdaterService> = new SectionUpdaterService(
		null,
		null
	) as jest.Mocked<SectionUpdaterService>;
	const mockFeatureUpdater: jest.Mocked<FeatureUpdaterService> = new FeatureUpdaterService(null) as jest.Mocked<
		FeatureUpdaterService
	>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: FeatureService,
					useValue: mockFeatureService
				},
				{
					provide: ScenarioService,
					useValue: mockScenarioService
				},
				{
					provide: ScenarioUpdaterService,
					useValue: mockScenarioUpdater
				},
				{
					provide: SectionUpdaterService,
					useValue: mockSectionUpdater
				},

				{
					provide: FeatureUpdaterService,
					useValue: mockFeatureUpdater
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

		const apiFeature: ApiFeature = {
			_id: 'fid',
			name: 'my feature'
		};

		beforeEach(() => {
			mockFeatureService.getFeature.mockReturnValue(of(apiFeature));
			mockScenarioService.getScenariosFeature.mockReturnValue(of(apiScenarios));
		});

		afterEach(() => {
			mockScenarioService.getScenariosFeature.mockClear();
			mockScenarioUpdater.updateData.mockClear();
			mockSectionUpdater.updateSection.mockClear();
		});

		it('should request the feature service with the given feature id', async () => {
			await service.loadFeature(apiFeature._id);
			expect(mockFeatureService.getFeature).toHaveBeenCalledWith(apiFeature._id);
		});

		it('should update the feature returned by the service through the feature updater', async () => {
			await service.loadFeature(apiFeature._id);
			const updateFeatureData: FeatureUpdateData = {
				name: apiFeature.name
			};
			expect(mockFeatureUpdater.updateData).toHaveBeenCalledWith(updateFeatureData);
		});

		it('should update the feature returned by the service through the feature updater', async () => {
			mockFeatureService.getFeature.mockReturnValue(of({ _id: 'xxx', name: undefined }));
			await service.loadFeature('xxx');
			const updateFeatureData: FeatureUpdateData = {
				name: ''
			};
			expect(mockFeatureUpdater.updateData).toHaveBeenCalledWith(updateFeatureData);
		});

		it('should throw an error when the feature does not exist', async () => {
			mockFeatureService.getFeature.mockReturnValue(of(null));
			await expect(service.loadFeature()).rejects.toThrow(new Error('This feature does not exist'));
		});

		it('should request the scenario service', async () => {
			await service.loadFeature();
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
