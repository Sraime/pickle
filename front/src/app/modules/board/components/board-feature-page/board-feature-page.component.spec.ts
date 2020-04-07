import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFeaturePageComponent } from './board-feature-page.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { DeleteScenarioEventData } from '../scenario-builder/delete-scenario-event-data';
import { FeatureUpdaterService } from '../../services/updaters/feature-updater/feature-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { ScenarioUpdaterService } from '../../services/updaters/scenario-updater/scenario-updater.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GherkinGeneratorDialogComponent } from '../gherkin-generator-dialog/gherkin-generator-dialog.component';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { EditTextComponent } from '../edit-text/edit-text.component';
import { MockComponent } from 'ng-mocks';
import { ScenarioBuilderComponent } from '../scenario-builder/scenario-builder.component';
import { BoardSocketSynchro } from '../../services/boardSynchronizer/board-socket-synchro.service';
import { Subject } from 'rxjs';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { BoardLoaderService } from '../../services/board-loader/board-loader.service';
jest.mock('../../services/board-loader/board-loader.service');

const mockBoardLoader: jest.Mocked<BoardLoaderService> = new BoardLoaderService(
	null,
	null,
	null
) as jest.Mocked<BoardLoaderService>;
mockBoardLoader.loadFeature.mockReturnValue(Promise.resolve());

describe('BoardFeaturePageComponent', () => {
	let component: BoardFeaturePageComponent;
	let fixture: ComponentFixture<BoardFeaturePageComponent>;
	const stubFeatureUpadateData = jest.fn();
	const stubScenarioUpadateData = jest.fn();
	const stubStartSocketSynchro = jest.fn();
	const stubStopSocketSynchro = jest.fn();
	const stubOpenDialog = jest.fn();
	const subjectScenarioUpdater: Subject<ScenarioUpdateData> = new Subject<ScenarioUpdateData>();

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [
				BoardFeaturePageComponent,
				MockComponent(ScenarioBuilderComponent),
				MockComponent(EditTextComponent)
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
						getObservable: jest.fn().mockReturnValue(subjectScenarioUpdater),
						updateData: stubScenarioUpadateData
					}
				},
				{
					provide: BoardSocketSynchro,
					useValue: {
						startSynchronization: stubStartSocketSynchro,
						stopSynchronization: stubStopSocketSynchro
					}
				},
				{
					provide: MatDialog,
					useValue: {
						open: stubOpenDialog
					}
				},
				{
					provide: BoardLoaderService,
					useValue: mockBoardLoader
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

	it('should have a feature name in an edit text', () => {
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

		it('should add a scenarios emited by the updater', async(() => {
			subjectScenarioUpdater.next({
				name: 'hello',
				codeBlockId: 'S1',
				updateType: EventUpdateType.CREATE
			});
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				const builders = fixture.debugElement.queryAll(By.css('scenario-builder'));
				expect(builders.length).toEqual(1);
			});
		}));

		it('should dispatch a add event through the service updater after clicking on the add btn', () => {
			btnAdd.nativeElement.click();
			expect(stubScenarioUpadateData).toHaveBeenCalledWith({
				name: '',
				codeBlockId: '',
				updateType: EventUpdateType.CREATE
			});
		});
	});

	describe('delete scenario', () => {
		it('should remove the given scenario from the list after receiving a delete event', () => {
			const existingScenarios: Map<string, string> = new Map<string, string>();
			existingScenarios.set('S1', 'Scenairo1');
			existingScenarios.set('S2', 'Scenairo2');
			component.scenarios = existingScenarios;
			subjectScenarioUpdater.next({
				name: '',
				codeBlockId: 'S2',
				updateType: EventUpdateType.DELETE
			});
			expect(Array.from(component.scenarios.keys())).toEqual(['S1']);
		});

		it('should dispatch a delete event through the service updater', () => {
			const existingScenarios: Map<string, string> = new Map<string, string>();
			existingScenarios.set('S1', 'Scenairo1');
			component.scenarios = existingScenarios;
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
