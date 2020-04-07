import { TestBed } from '@angular/core/testing';

import { FeatureAssemblyService } from './feature-assembly.service';
import { Feature } from '../../interfaces/feature.interface';
import { FeatureUpdaterService } from '../updaters/feature-updater/feature-updater.service';
import { Subject } from 'rxjs';
import { FeatureUpdateData } from '../../interfaces/feature-update-data.interface';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionServiceService } from '../updaters/section-service/section-service.service';
import { SectionUpdateData } from '../../interfaces/section-update.interface';

describe('FeatureAssemblyService', () => {
	let service: FeatureAssemblyService;
	const subjectFeatureObservable = new Subject<FeatureUpdateData>();
	const subjectScenarioObservable = new Subject<ScenarioUpdateData>();
	const subjectSectionObservable = new Subject<SectionUpdateData>();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: FeatureUpdaterService,
					useValue: {
						getObservable: jest.fn().mockReturnValue(subjectFeatureObservable.asObservable())
					}
				},
				{
					provide: ScenarioUpdaterService,
					useValue: {
						getObservable: jest.fn().mockReturnValue(subjectScenarioObservable.asObservable())
					}
				},
				{
					provide: SectionServiceService,
					useValue: {
						getSectionObservable: jest.fn().mockReturnValue(subjectSectionObservable.asObservable())
					}
				}
			]
		});
	});

	const simpleScenarioCreated: ScenarioUpdateData = {
		name: 'First Scenario',
		codeBlockId: 'S1',
		updateType: EventUpdateType.CREATE
	};

	const simpleScenarioUpdated: ScenarioUpdateData = {
		name: 'First Scenario Update',
		codeBlockId: 'S1',
		updateType: EventUpdateType.UPDATE
	};

	beforeEach(() => {
		service = TestBed.get(FeatureAssemblyService);
	});

	afterEach(() => {
		service.stopListenning();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getAssembledFeature', () => {
		let assembledFeature: Feature;

		it('should return an empty feature by default', () => {
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature).toEqual({ name: '', scenarios: [] });
		});

		it('should update the feature name after receiving a feature event', () => {
			subjectFeatureObservable.next({ name: 'amazing feature' });
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature).toEqual({ name: 'amazing feature', scenarios: [] });
		});

		it('should add a scenario in the feature when it is not registered', () => {
			subjectScenarioObservable.next(simpleScenarioCreated);
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature.scenarios).toEqual([
				{
					name: 'First Scenario',
					givenSteps: [],
					whenSteps: [],
					thenSteps: []
				}
			]);
		});

		it('should update the scenario name when it is already registered', () => {
			subjectScenarioObservable.next(simpleScenarioCreated);
			subjectScenarioObservable.next(simpleScenarioUpdated);
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature.scenarios).toEqual([
				{
					name: 'First Scenario Update',
					givenSteps: [],
					whenSteps: [],
					thenSteps: []
				}
			]);
		});

		it('should delete the scenario after receiving a delete event', () => {
			subjectScenarioObservable.next(simpleScenarioCreated);
			subjectScenarioObservable.next({
				name: '',
				codeBlockId: 'S1',
				updateType: EventUpdateType.DELETE
			});
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature.scenarios).toEqual([]);
		});

		const sections = ['Given', 'When', 'Then'];
		sections.forEach((sectionName) => {
			it(
				'should update the section steps ' +
					sectionName +
					' when it is updated for a registered scenario',
				() => {
					subjectScenarioObservable.next(simpleScenarioCreated);
					subjectSectionObservable.next({
						name: sectionName,
						steps: [{ name: 'step1' }],
						codeBlockId: 'S1'
					});
					assembledFeature = service.getAssembledFeature();

					expect(assembledFeature.scenarios[0][sectionName.toLowerCase() + 'Steps']).toEqual([
						{ name: 'step1' }
					]);
				}
			);
		});

		it('should not remove steps when a scenario is updated', () => {
			subjectScenarioObservable.next(simpleScenarioCreated);
			subjectSectionObservable.next({
				name: 'Given',
				steps: [{ name: 'step1' }],
				codeBlockId: 'S1'
			});
			assembledFeature = service.getAssembledFeature();

			expect(assembledFeature.scenarios[0].givenSteps).toEqual([{ name: 'step1' }]);
		});

		it('should not try to update an unexisting scenario', () => {
			subjectScenarioObservable.next(simpleScenarioUpdated);
			assembledFeature = service.getAssembledFeature();
			expect(assembledFeature.scenarios).toEqual([]);
		});
	});

	describe('getAssembledScenario()', () => {
		it('should return the assembled scenario with the given codeBlockId', () => {
			subjectScenarioObservable.next(simpleScenarioCreated);
			const assembledScenario = service.getAssembledScenario(simpleScenarioCreated.codeBlockId);
			expect(assembledScenario).toEqual({
				name: 'First Scenario',
				givenSteps: [],
				whenSteps: [],
				thenSteps: []
			});
		});

		it('should return null when there is scenario with the given codeBlockId', () => {
			const assembledScenario = service.getAssembledScenario('xxx');
			expect(assembledScenario).toEqual(null);
		});
	});
});
