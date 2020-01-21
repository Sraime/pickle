import { Component, OnInit } from '@angular/core';
import { v1 as uuid } from 'uuid';
import { DeleteScenarioEventData } from '../scenario-builder/delete-scenario-event-data';

@Component({
	selector: 'app-board-feature-page',
	templateUrl: './board-feature-page.component.html',
	styleUrls: ['./board-feature-page.component.scss']
})
export class BoardFeaturePageComponent implements OnInit {
	scenarios: Array<string> = [];

	constructor() {}

	ngOnInit() {
		this.addScenario();
	}

	addScenario() {
		this.scenarios.push(uuid());
	}

	delScenario(delEventData: DeleteScenarioEventData) {
		this.scenarios = this.scenarios.filter((sc) => sc !== delEventData.codeBlockId);
	}
}
