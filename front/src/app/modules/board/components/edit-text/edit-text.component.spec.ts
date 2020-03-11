import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextComponent } from './edit-text.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('EditTextComponent', () => {
	let component: EditTextComponent;
	let fixture: ComponentFixture<EditTextComponent>;

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [EditTextComponent],
			imports: [
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				BrowserAnimationsModule,
				MatButtonModule,
				FormsModule
			]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	let text;
	const TEXT_SELECTOR = '.editable-text';

	beforeEach(() => {
		text = fixture.debugElement.query(By.css(TEXT_SELECTOR));
	});

	it('should have the text displayed', async(() => {
		component.text = 'my text';
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			text = fixture.debugElement.query(By.css(TEXT_SELECTOR));
			expect(text.nativeElement.textContent).toEqual('my text');
		});
	}));

	it('should have a default placeholder : your text here', () => {
		text = fixture.debugElement.query(By.css(TEXT_SELECTOR));
		expect(text.nativeElement.textContent).toEqual('your text here');
	});

	it('should display the configured placeholder', async(() => {
		component.placeholder = 'my placeholder';
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			text = fixture.debugElement.query(By.css(TEXT_SELECTOR));
			expect(text.nativeElement.textContent).toEqual('my placeholder');
		});
	}));

	describe('edit mode', () => {
		const EDIT_INPUT_SELECTOR = 'input.input-edit-text';
		const EDIT_BTN_SELECTOR = 'button.btn-save-text';

		it('should start the edit mode when clicking on the text', async(() => {
			text.nativeElement.click();
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

		it('should fill the input with the actual text', async(() => {
			component.text = 'existing scenario';
			text.nativeElement.click();
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				const input = fixture.debugElement.query(By.css(EDIT_INPUT_SELECTOR));
				expect(input.nativeElement.value).toEqual('existing scenario');
			});
		}));

		it('should stop the edit mode after clicking on the save button', async(() => {
			text.nativeElement.click();
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

		it('should not display the text', async(() => {
			text.nativeElement.click();
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				text = fixture.debugElement.query(By.css(TEXT_SELECTOR));
				expect(text).toBeFalsy();
			});
		}));

		it('should emit a save event after updating the text', (done) => {
			component.text = 'my text';
			component.saveEvent.subscribe((updatedText: string) => {
				expect(updatedText).toEqual('my text');
				done();
			});
			text.nativeElement.click();
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				const saveBtn = fixture.debugElement.query(By.css(EDIT_BTN_SELECTOR));
				saveBtn.nativeElement.click();
				fixture.detectChanges();
			});
		});
	});
});
