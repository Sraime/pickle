import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GherkinGeneratorDialogComponent } from './gherkin-generator-dialog.component';
import { configureTestSuite } from 'ng-bullet';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { MatDialogRef, MatDialogModule } from '@angular/material';
import { GherkinCodeGenerator } from '../../libs/gherkin-code-generator/gherkin-code-generator';

jest.mock('../../libs/gherkin-code-generator/gherkin-code-generator');

describe('GherkinGeneratorDialogComponent', () => {
	let component: GherkinGeneratorDialogComponent;
	let fixture: ComponentFixture<GherkinGeneratorDialogComponent>;
	const stubGetAssembledFeature = jest.fn();
	const stubGenerateFeatureCode = jest.fn();

	stubGenerateFeatureCode.mockReturnValue('worked');

	GherkinCodeGenerator.generateFeatureCode = stubGenerateFeatureCode.bind(GherkinCodeGenerator);

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [GherkinGeneratorDialogComponent],
			imports: [MatDialogModule],
			providers: [
				{
					provide: MatDialogRef,
					useValue: jest.fn()
				},
				{
					provide: FeatureAssemblyService,
					useValue: {
						getAssembledFeature: stubGetAssembledFeature
					}
				}
			]
		});
	});

	const emptyFeature = { name: '', scenarios: [] };
	beforeEach(() => {
		stubGetAssembledFeature.mockReturnValue(emptyFeature);
		fixture = TestBed.createComponent(GherkinGeneratorDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		stubGetAssembledFeature.mockClear();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
