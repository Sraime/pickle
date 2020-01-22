import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'edit-text',
	templateUrl: './edit-text.component.html',
	styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent implements OnInit {
	@Input()
	text = '';

	@Input()
	placeholder = 'your text here';

	isEditMode = false;

	constructor() {}

	ngOnInit() {}

	switchEditMode() {
		this.isEditMode = !this.isEditMode;
	}
}
