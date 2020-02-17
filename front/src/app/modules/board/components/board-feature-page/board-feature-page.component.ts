import { Component, OnInit } from '@angular/core';
import { v1 as uuid } from 'uuid';
import { DeleteScenarioEventData } from '../scenario-builder/delete-scenario-event-data';
import { FeatureUpdaterService } from '../../services/updaters/feature-updater/feature-updater.service';
import { ScenarioUpdaterService } from '../../services/updaters/scenario-updater/scenario-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { MatDialog } from '@angular/material';
import { GherkinGeneratorDialogComponent } from '../gherkin-generator-dialog/gherkin-generator-dialog.component';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';

@Component({
	selector: 'app-board-feature-page',
	templateUrl: './board-feature-page.component.html',
	styleUrls: ['./board-feature-page.component.scss']
})
export class BoardFeaturePageComponent implements OnInit {
	scenarios: Array<string> = [];

	constructor(
		private featureUpdaterService: FeatureUpdaterService,
		private scenarioUpdaterService: ScenarioUpdaterService,
		private featureAssemblyService: FeatureAssemblyService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.addScenario();
	}

	addScenario() {
		const scenarioUuid = uuid();
		this.scenarioUpdaterService.updateData({
			name: '',
			codeBlockId: scenarioUuid,
			updateType: EventUpdateType.CREATE
		});
		this.scenarios.push(scenarioUuid);
	}

	delScenario(delEventData: DeleteScenarioEventData) {
		this.scenarioUpdaterService.updateData({
			name: '',
			codeBlockId: delEventData.codeBlockId,
			updateType: EventUpdateType.DELETE
		});
		this.scenarios = this.scenarios.filter((sc) => sc !== delEventData.codeBlockId);
	}

	updateName(updatedName) {
		this.featureUpdaterService.updateData({ name: updatedName });
	}

	openGenerator() {
		this.dialog.open(GherkinGeneratorDialogComponent, { width: '50%' });
	}
}
