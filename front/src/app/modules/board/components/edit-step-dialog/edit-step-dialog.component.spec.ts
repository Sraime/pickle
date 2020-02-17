import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStepDialogComponent } from './edit-step-dialog.component';
import { configureTestSuite } from 'ng-bullet';
import { By, BrowserModule } from '@angular/platform-browser';
import {
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';

describe('EditStepDialogComponent', () => {
	let component: EditStepDialogComponent;
	let fixture: ComponentFixture<EditStepDialogComponent>;
	const stubDialogRef = {
		close: jest.fn(),
		backdropClick: jest.fn().mockReturnValue(new Subject())
	};

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [EditStepDialogComponent],
			imports: [
				BrowserAnimationsModule,
				MatDialogModule,
				MatButtonModule,
				FormsModule,
				BrowserModule,
				MatInputModule,
				MatFormFieldModule
			],
			providers: [
				{
					provide: MatDialogRef,
					useValue: stubDialogRef
				},
				{
					provide: MAT_DIALOG_DATA,
					useValue: { name: '' }
				}
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditStepDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		stubDialogRef.close.mockClear();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close with the current text when a backdropClick is emited', () => {
		stubDialogRef.backdropClick().next();
		expect(stubDialogRef.close).toHaveBeenCalled();
	});

	it('should display the title : Step Edition', () => {
		const title = fixture.debugElement.query(By.css('h2.mat-dialog-title'));
		expect(title.nativeElement.textContent).toEqual('Step Edition');
	});

	it('should have an input filled with the text of the edited step', async(() => {
		component.step = { name: 'mystep' };
		component.ngOnInit();
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const input = fixture.debugElement.query(By.css('.mat-dialog-content input.edit-step'));
			expect(input.nativeElement.value).toEqual('mystep');
		});
	}));

	it('should have a validate button', () => {
		const btnSave = fixture.debugElement.query(By.css('.mat-dialog-content button.save-edit-step'));
		expect(btnSave.nativeElement.textContent).toEqual('Save');
	});

	it('should close with the new modified value after validating', () => {
		const input = fixture.debugElement.query(By.css('.mat-dialog-content input.edit-step'));
		input.nativeElement.value = 'edited';
		input.nativeElement.dispatchEvent(new Event('input'));
		const btnSave = fixture.debugElement.query(By.css('.mat-dialog-content button.save-edit-step'));
		btnSave.nativeElement.click();
		expect(stubDialogRef.close).toHaveBeenLastCalledWith({ name: 'edited' });
	});

	it('should close the with initial value after canceling', () => {
		component.step = { name: 'hello' };
		component.ngOnInit();
		const input = fixture.debugElement.query(By.css('.mat-dialog-content input.edit-step'));
		input.nativeElement.value = 'edited';
		input.nativeElement.dispatchEvent(new Event('input'));
		const btnSave = fixture.debugElement.query(
			By.css('.mat-dialog-content button.cancel-edit-step')
		);
		btnSave.nativeElement.click();
		expect(stubDialogRef.close).toHaveBeenLastCalledWith({ name: 'hello' });
	});
});
