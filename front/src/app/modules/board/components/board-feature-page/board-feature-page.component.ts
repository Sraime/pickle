import { Component, OnInit } from '@angular/core';
import { v1 as uuid } from 'uuid';

@Component({
	selector: 'app-board-feature-page',
	templateUrl: './board-feature-page.component.html',
	styleUrls: ['./board-feature-page.component.scss']
})
export class BoardFeaturePageComponent implements OnInit {
	private scenarios: Array<string> = [];

	constructor() {}

	ngOnInit() {
		this.addScenario();
	}

	addScenario() {
		this.scenarios.push(uuid());
	}
}
