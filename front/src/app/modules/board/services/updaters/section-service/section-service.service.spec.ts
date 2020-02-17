import { TestBed } from '@angular/core/testing';

import { SectionServiceService } from './section-service.service';
import { Observable } from 'rxjs';
import { Section } from '../../../interfaces/section.interface';
import { Step } from '../../../interfaces/step.interface';
import { SectionValidatorFactory } from '../../../libs/section-validators/section-validator-factory';
import { SectionModel } from '../../../models/section.model';

describe('SectionServiceService', () => {
	let service: SectionServiceService;
	let stubGetValidator;
	let stubsValidate;

	beforeEach(() => {
		stubsValidate = {};
		stubsValidate.Given = jest.fn().mockReturnValue(true);
		stubsValidate.When = jest.fn().mockReturnValue(true);
		stubsValidate.Then = jest.fn().mockReturnValue(true);
		stubGetValidator = jest.fn().mockImplementation((sn) => {
			if (sn === 'Given') {
				return { validate: stubsValidate.Given };
			}
			if (sn === 'When') {
				return { validate: stubsValidate.When };
			}
			if (sn === 'Then') {
				return { validate: stubsValidate.Then };
			}
		});
		TestBed.configureTestingModule({
			providers: [
				{
					provide: SectionValidatorFactory,
					useValue: {
						getSectionValidator: stubGetValidator
					}
				}
			]
		});
		service = TestBed.get(SectionServiceService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	const sections = ['Given', 'When', 'Then'];

	it('should get all section validators from the factory', () => {
		expect(stubGetValidator).toBeCalledWith('Given');
		expect(stubGetValidator).toBeCalledWith('When');
		expect(stubGetValidator).toBeCalledWith('Then');
	});

	sections.forEach((section) => {
		describe('section ' + section + ' subscription', () => {
			it('should return an observable for the ' + section + ' section', () => {
				let obs: Observable<Section>;
				obs = service.getSectionObservable(section);
				expect(obs).toBeTruthy();
			});

			it('should dispatch the updated section', (done) => {
				const updatedSteps: Step[] = [{ name: 'step1' }, { name: 'step2' }];
				const expectedUpdate = {
					name: section,
					steps: updatedSteps,
					codeBlockId: 'codeBlockId'
				};

				service.getSectionObservable(section).subscribe((steps) => {
					expect(steps).toEqual(expectedUpdate);
					done();
				});
				service.updateSection(new SectionModel(section, 'codeBlockId', updatedSteps));
			});
		});

		it('should dispatch the updated only for the updated section', () => {
			let nbCall = 0;
			service.getSectionObservable('Given').subscribe((s) => {
				nbCall++;
			});
			service.getSectionObservable('When').subscribe((s) => {
				nbCall++;
			});
			service.getSectionObservable('Then').subscribe((s) => {
				nbCall++;
			});
			service.updateSection(new SectionModel(section, 'codeBlockId', []));
			expect(nbCall).toEqual(1);
		});

		it('should throw an expection when requesting an innexiting section', () => {
			try {
				service.getSectionObservable('NOT_EXISTING_SECTION');
			} catch (e) {
				expect(e.name).toEqual('UnknownSectionException');
				expect(e.message).toEqual('this section does not exist');
			}
		});

		it('should throw an expection when updating an innexiting section', () => {
			try {
				service.updateSection(new SectionModel('NOT_EXISTING_SECTION', 'codeBlockId', []));
			} catch (e) {
				expect(e.name).toEqual('UnknownSectionException');
				expect(e.message).toEqual('this section does not exist');
			}
		});
	});
});
