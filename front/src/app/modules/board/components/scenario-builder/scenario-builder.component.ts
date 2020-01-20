import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'scenario-builder',
	templateUrl: './scenario-builder.component.html',
	styleUrls: ['./scenario-builder.component.scss']
})
export class ScenarioBuilderComponent implements OnInit {
	name: string;

	isNameInEditMode = false;

	@Input()
	codeBlockId: string;

	constructor() {}

	ngOnInit() {}

	switchEditNameMode() {
		this.isNameInEditMode = !this.isNameInEditMode;
	}
}
