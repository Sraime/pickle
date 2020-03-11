import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GherkinGeneratorDialogComponent } from './gherkin-generator-dialog.component';
import { configureTestSuite } from 'ng-bullet';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { GherkinCodeGenerator } from '../../libs/gherkin-code-generator/gherkin-code-generator';
import { By } from '@angular/platform-browser';
import saveAs from 'file-saver';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

jest.mock('../../libs/gherkin-code-generator/gherkin-code-generator');
jest.mock('file-saver');

describe('GherkinGeneratorDialogComponent', () => {
	let component: GherkinGeneratorDialogComponent;
	let fixture: ComponentFixture<GherkinGeneratorDialogComponent>;
	const stubGetAssembledFeature = jest.fn();
	const MockGherkinCodeGenerator = GherkinCodeGenerator as jest.Mocked<typeof GherkinCodeGenerator>;
	MockGherkinCodeGenerator.generateFeatureCode.mockReturnValue('feature code');

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [GherkinGeneratorDialogComponent],
			imports: [MatDialogModule, MatButtonModule, MatIconModule],
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
				},
				GherkinCodeGenerator
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

	it('should display the feature text', async(() => {
		expect(MockGherkinCodeGenerator.generateFeatureCode).toHaveBeenCalledWith(emptyFeature);
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const code = fixture.debugElement.query(By.css('.generated-feature-code'));
			expect(code.nativeElement.textContent).toEqual('feature code');
		});
	}));

	describe('btn download', () => {
		let btnDownload;
		beforeEach(() => {
			btnDownload = fixture.debugElement.query(By.css('button.btn-download-code'));
		});

		it('should have an export button', () => {
			expect(btnDownload.nativeElement.textContent.includes('Download')).toBeTruthy();
		});

		it('should start download after clicking on the button', () => {
			btnDownload.nativeElement.click();
			const blob = new Blob(['feature code'], { type: 'text/plain' });
			expect(saveAs).toHaveBeenCalledWith(blob, 'feature_code.feature');
		});
	});
});
