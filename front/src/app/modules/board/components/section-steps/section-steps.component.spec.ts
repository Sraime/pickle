import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStepsComponent } from './section-steps.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import {
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { SectionServiceService } from '../../services/updaters/section-service/section-service.service';
import { of } from 'rxjs';
import { Section } from '../../interfaces/section.interface';
import { SectionModel } from '../../models/section.model';

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
					provide: SectionServiceService,
					useValue: sectionService
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

	it('should create', () => {
		expect(component).toBeTruthy();
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

			beforeEach(() => {
				input = fixture.debugElement.query(By.css('input.input-new-step'));
			});

			it('should add a new step and clean the input after filling the it and pressing Enter', () => {
				component.sectionName = 'Given';
				component.codeBlockId = 'idblock';
				input.nativeElement.value = 'step1';
				const sentSectionUpdate = new SectionModel('Given', 'idblock', [{ name: 'step1' }]);
				input.nativeElement.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' })
				);
				expect(component.steps.length).toEqual(1);
				expect(stubUpdateSection).toHaveBeenCalledWith(sentSectionUpdate);
				expect(input.nativeElement.value).toEqual('');
			});

			it('should not add new step when the input is empty', () => {
				input.nativeElement.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' })
				);
				expect(component.steps.length).toEqual(0);
			});
		});

		describe('remove step', () => {
			it('should send the list the deleted element to the service when it emit a delEvent', () => {
				component.steps = [{ name: 'step1' }];
				component.codeBlockId = 'idblock';
				component.delStep({ name: 'step1' });
				const sentSectionUpdate = new SectionModel('', 'idblock', []);
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
