import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioBuilderComponent } from './scenario-builder.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { DeleteScenarioEventData } from './delete-scenario-event-data';

describe('ScenarioBuilderComponent', () => {
	let component: ScenarioBuilderComponent;
	let fixture: ComponentFixture<ScenarioBuilderComponent>;

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [ScenarioBuilderComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ScenarioBuilderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	const sections = [{ sectionName: 'Given' }, { sectionName: 'When' }, { sectionName: 'Then' }];

	sections.forEach((section) => {
		describe('section ' + section.sectionName, () => {
			it('should have a component with name' + section.sectionName, () => {
				const htmlSection = fixture.debugElement.query(
					By.css('section-steps[sectionName="' + section.sectionName + '"]')
				).nativeElement;
				expect(htmlSection).toBeTruthy();
				expect(htmlSection.getAttribute('sectionName')).toEqual(section.sectionName);
			});
		});
	});

	describe('delete scenario', () => {
		let btnDel;

		beforeEach(() => {
			btnDel = fixture.debugElement.query(By.css('.btn-del-scenario'));
		});

		it('should have a delete button', () => {
			expect(btnDel).toBeTruthy();
		});

		it('should emit an event with the codeBlockId after clicking on the button', (done) => {
			component.codeBlockId = 'codeID';
			component.delEvent.subscribe((codeBlockId) => {
				expect(codeBlockId).toEqual(new DeleteScenarioEventData('codeID'));
				done();
			});
			btnDel.nativeElement.click();
		});
	});

	describe('scenario name', () => {
		let scenarioName;
		const SCENARIO_HEADER_SELECTOR = '.scenario-header';
		const HEADER_MSG_SELECTOR = SCENARIO_HEADER_SELECTOR + ' .scenario-header-msg';
		const NAME_SELECTOR = HEADER_MSG_SELECTOR + ' edit-text.scenario-name';

		beforeEach(() => {
			scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
		});

		it('should have an edit text for the name', () => {
			scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
			expect(scenarioName).toBeTruthy();
		});
	});
});