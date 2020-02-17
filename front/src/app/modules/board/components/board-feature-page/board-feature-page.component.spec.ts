import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFeaturePageComponent } from './board-feature-page.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { DeleteScenarioEventData } from '../scenario-builder/delete-scenario-event-data';
import { FeatureUpdaterService } from '../../services/updaters/feature-updater/feature-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { ScenarioUpdaterService } from '../../services/updaters/scenario-updater/scenario-updater.service';
import { MatDialog, MatCardModule, MatIconModule } from '@angular/material';
import { GherkinGeneratorDialogComponent } from '../gherkin-generator-dialog/gherkin-generator-dialog.component';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { EditTextComponent } from '../edit-text/edit-text.component';
import { MockComponent } from 'ng-mocks';
import { ScenarioBuilderComponent } from '../scenario-builder/scenario-builder.component';

describe('BoardFeaturePageComponent', () => {
	let component: BoardFeaturePageComponent;
	let fixture: ComponentFixture<BoardFeaturePageComponent>;
	const stubFeatureUpadateData = jest.fn();
	const stubScenarioUpadateData = jest.fn();
	const stubOpenDialog = jest.fn();

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [
				BoardFeaturePageComponent,
				MockComponent(EditTextComponent),
				MockComponent(ScenarioBuilderComponent)
			],
			imports: [MatCardModule, MatIconModule],
			providers: [
				{
					provide: FeatureUpdaterService,
					useValue: {
						updateData: stubFeatureUpadateData
					}
				},
				{
					provide: FeatureAssemblyService,
					useValue: {}
				},
				{
					provide: ScenarioUpdaterService,
					useValue: {
						updateData: stubScenarioUpadateData
					}
				},
				{
					provide: MatDialog,
					useValue: {
						open: stubOpenDialog
					}
				}
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BoardFeaturePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display a one scenario builder by default', () => {
		const sbuilder = fixture.debugElement.query(By.css('scenario-builder'));
		expect(sbuilder).toBeTruthy();
	});

	it('should have a scenarion name in an edit text', () => {
		const name = fixture.debugElement.query(By.css('.feature-header edit-text.feature-name'));
		expect(name).toBeTruthy();
	});

	describe('add scenario', () => {
		let btnAdd;

		beforeEach(() => {
			btnAdd = fixture.debugElement.query(By.css('button.btn-add-scenario'));
		});

		it('should have an option for adding a new scenario builder', () => {
			expect(btnAdd.nativeElement.textContent.includes('New Scenario')).toBeTruthy();
		});

		it('should add a new scenario after clicking on the add btn', async(() => {
			btnAdd.nativeElement.click();
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				const builders = fixture.debugElement.queryAll(By.css('scenario-builder'));
				expect(builders.length).toEqual(2);
			});
		}));

		it('should dispatch a add event through the service updater', () => {
			btnAdd.nativeElement.click();
			expect(stubScenarioUpadateData).toHaveBeenCalledWith({
				name: '',
				codeBlockId: expect.any(String),
				updateType: EventUpdateType.CREATE
			});
		});
	});

	describe('delete scenario', () => {
		it('should remove the given scenario from the list after receiving a delete event', () => {
			component.scenarios = ['S1', 'S2'];
			component.delScenario(new DeleteScenarioEventData('S1'));
			expect(component.scenarios).toEqual(['S2']);
		});

		it('should dispatch a delete event through the service updater', () => {
			component.scenarios = ['S1'];
			component.delScenario(new DeleteScenarioEventData('S1'));
			expect(stubScenarioUpadateData).toHaveBeenCalledWith({
				name: '',
				codeBlockId: 'S1',
				updateType: EventUpdateType.DELETE
			});
		});
	});

	it('should dispatch through the service updater when the name change', () => {
		const comp: EditTextComponent = fixture.debugElement.query(By.directive(EditTextComponent))
			.componentInstance;
		comp.saveEvent.emit('hello');
		expect(stubFeatureUpadateData).toHaveBeenCalledWith({ name: 'hello' });
	});

	describe('generate code option', () => {
		let btnGenrate;

		beforeEach(() => {
			btnGenrate = fixture.debugElement.query(By.css('.btn-generate-code'));
		});

		it('should have a code generation button', () => {
			expect(btnGenrate).toBeTruthy();
		});

		it('should open the dialog code genrator after clicking on the button', () => {
			btnGenrate.nativeElement.click();
			expect(stubOpenDialog).toHaveBeenCalledWith(GherkinGeneratorDialogComponent, {
				width: '50%'
			});
		});
	});
});
