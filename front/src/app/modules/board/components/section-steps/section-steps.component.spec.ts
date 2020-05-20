import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStepsComponent } from './section-steps.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { SectionUpdaterService } from '../../services/updaters/section-updater/section-updater.service';
import { of } from 'rxjs';
import { SectionModel } from '../../models/section.model';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { Scenario } from '../../interfaces/scenario.interface';

jest.mock('../../services/feature-assembly/feature-assembly.service');

const mockAssemblyService: jest.Mocked<FeatureAssemblyService> = new FeatureAssemblyService(
	null,
	null,
	null
) as jest.Mocked<FeatureAssemblyService>;

mockAssemblyService.getAssembledScenario.mockReturnValue(null);

describe('SectionSetpsComponent', () => {
	let component: SectionStepsComponent;
	let fixture: ComponentFixture<SectionStepsComponent>;
	let sectionService;

	configureTestSuite(() => {
		sectionService = {
			getSectionObservable: jest.fn(),
			updateSection: jest.fn()
		};
		TestBed.configureTestingModule({
			declarations: [SectionStepsComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{
					provide: SectionUpdaterService,
					useValue: sectionService
				},
				{
					provide: FeatureAssemblyService,
					useValue: mockAssemblyService
				}
			],
			imports: [
				MatCardModule,
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				BrowserAnimationsModule,
				MatListModule,
				DragDropModule
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SectionStepsComponent);
		component = fixture.componentInstance;
		sectionService.getSectionObservable.mockReturnValue(
			of({ isValid: true, name: 'Given', steps: [] })
		);
		fixture.detectChanges();
	});

	beforeEach(() => {
		mockAssemblyService.getAssembledScenario.mockReturnValue(null);
	});

	afterEach(() => {
		mockAssemblyService.getAssembledScenario.mockClear();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize steps whith stored step by the assembly', () => {
		component.sectionName = 'Given';
		component.codeBlockId = 'xxx';
		const storedScenario: Scenario = {
			name: 'hello',
			givenSteps: [{ name: 'step1' }],
			whenSteps: [],
			thenSteps: []
		};
		mockAssemblyService.getAssembledScenario.mockReturnValue(storedScenario);
		component.ngOnInit();
		expect(mockAssemblyService.getAssembledScenario).toHaveBeenCalledWith('xxx');
		expect(component.steps).toEqual(storedScenario.givenSteps);
	});

	it('should get the step list from the service when it is the same code block', () => {
		component.codeBlockId = 'currentBlockID';
		const updatedSection = {
			name: 'Given',
			steps: [{ name: 'step' }],
			codeBlockId: 'currentBlockID'
		};
		sectionService.getSectionObservable.mockReturnValue(of(updatedSection));
		component.ngOnInit();
		expect(component.steps).toEqual([{ name: 'step' }]);
	});

	it('should not update the steps when code block is not the same', () => {
		component.codeBlockId = 'currentBlockID';
		const updatedSection = {
			name: 'Given',
			steps: [{ name: 'step' }],
			codeBlockId: 'anotherBlockID'
		};
		sectionService.getSectionObservable.mockReturnValue(of(updatedSection));
		component.ngOnInit();
		expect(component.steps).toEqual([]);
	});

	it('should have a title', async(() => {
		component.sectionName = 'Given';
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const title = fixture.debugElement.query(By.css('.section-steps-title')).nativeElement;
			expect(title.textContent).toEqual('Given');
		});
	}));

	it('should have a step list', async(() => {
		const list = fixture.debugElement.query(By.css('.section-steps-list')).nativeElement;
		expect(list).toBeTruthy();
	}));

	it('should display registered steps', async(() => {
		component.steps = [{ name: 'step1' }, { name: 'step2' }];
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const steps = fixture.debugElement.queryAll(By.css('.section-steps-list .section-step'));
			expect(steps.length).toEqual(2);
		});
	}));

	it('should have a list of step empty by default', () => {
		expect(component.steps).toEqual([]);
	});

	it('should have an input for adding new steps', async(() => {
		component.sectionName = 'Given';
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const input = fixture.debugElement.query(By.css('input.input-new-step'));
			expect(input).toBeTruthy();
		});
	}));

	describe('actions', () => {
		let stubUpdateSection;

		beforeEach(() => {
			stubUpdateSection = jest.spyOn(sectionService, 'updateSection');
		});

		afterEach(() => {
			stubUpdateSection.mockClear();
		});

		describe('adding steps', () => {
			let input;
			const sentSectionUpdate = new SectionModel('Given', 'idblock', [{ name: 'step1' }]);

			beforeEach(() => {
				input = fixture.debugElement.query(By.css('input.input-new-step'));
				component.sectionName = 'Given';
				component.codeBlockId = 'idblock';
				component.steps = [];
			});

			it('should add a new step and clean the input after filling the it and pressing Enter', () => {
				input.nativeElement.value = 'step1';
				input.nativeElement.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' })
				);
				expect(component.steps.length).toEqual(1);
				expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
				expect(input.nativeElement.value).toEqual('');
			});

			it('should have a save button when the input has the focus', async(() => {
				input.nativeElement.focus();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const btnsave = fixture.debugElement.query(By.css('button.btn-add-step'));
					expect(btnsave).toBeTruthy();
				});
			}));

			it('should add the step after clicking on the add button', async(() => {
				input.nativeElement.focus();
				input.nativeElement.value = 'step1';
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const btnsave = fixture.debugElement.query(By.css('button.btn-add-step'));
					btnsave.nativeElement.click();
					expect(component.steps.length).toEqual(1);
					expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
				});
			}));

			it('should add the step when the input lost focus', async(() => {
				input.nativeElement.focus();
				input.nativeElement.value = 'step1';
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					input.nativeElement.dispatchEvent(new Event('focusout'));
					fixture.detectChanges();
					expect(component.steps.length).toEqual(1);
					expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
				});
			}));

			it('should not add new step when the input is empty', () => {
				input.nativeElement.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' })
				);
				expect(component.steps.length).toEqual(0);
			});
		});

		describe('remove step', () => {
			it('should send the list with the deleted element to the service when it emit a delete event', () => {
				component.steps = [{ name: 'step1' }];
				component.codeBlockId = 'idblock';
				component.delStep({ name: 'step1' });
				const sentSectionUpdate = new SectionModel('', 'idblock', []);
				expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
			});
		});

		describe('update step', () => {
			it('should send the list with the updated element to the service when it emit an update event', () => {
				component.steps = [{ name: 'step1' }];
				component.codeBlockId = 'idblock';
				component.updateStep([{ name: 'step1' }, { name: 'edited' }]);
				const sentSectionUpdate = new SectionModel('', 'idblock', [{ name: 'edited' }]);
				expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
			});
		});

		describe('move step', () => {
			let mockDragDropEvent: CdkDragDrop<string[]>;

			beforeEach(() => {
				mockDragDropEvent = {
					previousIndex: null,
					currentIndex: null,
					item: null,
					container: null,
					previousContainer: null,
					isPointerOverContainer: true,
					distance: null
				};
			});

			it('should move the step to its new index after a drop event', () => {
				component.steps = [{ name: 'step1' }, { name: 'step2' }];
				component.codeBlockId = 'idblock';
				mockDragDropEvent.previousIndex = 1;
				mockDragDropEvent.currentIndex = 0;
				component.dropStep(mockDragDropEvent);
				const sentSectionUpdate = new SectionModel('', 'idblock', [
					{ name: 'step2' },
					{ name: 'step1' }
				]);
				expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
			});
		});
	});
});
