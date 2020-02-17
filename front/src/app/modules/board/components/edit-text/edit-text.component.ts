import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'edit-text',
	templateUrl: './edit-text.component.html',
	styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent implements OnInit {
	@Input()
	text: string = '';

	@Input()
	placeholder = 'your text here';

	@Output('update')
	saveEvent = new EventEmitter();

	isEditMode = false;

	constructor() {}

	ngOnInit() {}

	switchEditMode() {
		if (this.isEditMode) {
			this.saveEvent.emit(this.text);
		}
		this.isEditMode = !this.isEditMode;
	}
}
