import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioBuilderComponent } from './scenario-builder.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';

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
			it(
				'should have a component with name' + section.sectionName,
				async(() => {
					const htmlSection = fixture.debugElement.query(
						By.css('section-steps[sectionName="' + section.sectionName + '"]')
					).nativeElement;
					expect(htmlSection).toBeTruthy();
				})
			);
		});
	});

	describe('scenario name', () => {
		let scenarioName;
		const SCENARIO_HEADER_SELECTOR = '.scenario-header';
		const HEADER_MSG_SELECTOR = SCENARIO_HEADER_SELECTOR + ' .scenario-header-msg';
		const NAME_SELECTOR = HEADER_MSG_SELECTOR + ' .scenario-name';

		beforeEach(() => {
			scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
		});

		it('should have the name displayed', async(() => {
			component.name = 'my scenario';
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
				expect(scenarioName.nativeElement.textContent).toEqual('my scenario');
			});
		}));

		it("should have a placeholder for the scenario's name : your scenario's name here", () => {
			scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
			expect(scenarioName.nativeElement.textContent).toEqual("your scenario's name here");
		});

		describe('edit mode', () => {
			const EDIT_INPUT_SELECTOR = SCENARIO_HEADER_SELECTOR + ' input.input-edit-scenario-name';
			const EDIT_BTN_SELECTOR = SCENARIO_HEADER_SELECTOR + ' button.btn-save-scenario-name';

			it('should start the edit mode when clicking on the name', async(() => {
				scenarioName.nativeElement.click();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const input = fixture.debugElement.query(By.css(EDIT_INPUT_SELECTOR));
					const savebtn = fixture.debugElement.query(By.css(EDIT_BTN_SELECTOR));
					expect(input).toBeTruthy();
					expect(savebtn).toBeTruthy();
				});
			}));

			it("should not display edit mode element when it' not active", () => {
				const input = fixture.debugElement.query(By.css(EDIT_INPUT_SELECTOR));
				const savebtn = fixture.debugElement.query(By.css(EDIT_BTN_SELECTOR));
				expect(input).toBeFalsy();
				expect(savebtn).toBeFalsy();
			});

			it('should fill the input with the actual name', async(() => {
				component.name = 'existing scenario';
				scenarioName.nativeElement.click();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const input = fixture.debugElement.query(By.css(EDIT_INPUT_SELECTOR));
					expect(input.nativeElement.value).toEqual('existing scenario');
				});
			}));

			it('should stop the edit mode after clicking on the save button', async(() => {
				scenarioName.nativeElement.click();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					let saveBtn = fixture.debugElement.query(By.css(EDIT_BTN_SELECTOR));
					saveBtn.nativeElement.click();
					fixture.detectChanges();
					const input = fixture.debugElement.query(By.css(EDIT_INPUT_SELECTOR));
					saveBtn = fixture.debugElement.query(By.css(EDIT_BTN_SELECTOR));
					expect(input).toBeFalsy();
					expect(saveBtn).toBeFalsy();
				});
			}));

			it('should not display the name', async(() => {
				scenarioName.nativeElement.click();
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					const name = fixture.debugElement.query(By.css(NAME_SELECTOR));
					expect(name).toBeFalsy();
				});
			}));
		});
	});
});
