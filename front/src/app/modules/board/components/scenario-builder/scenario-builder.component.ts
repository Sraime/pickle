import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeleteScenarioEventData } from './delete-scenario-event-data';
import { ScenarioUpdaterService } from '../../services/updaters/scenario-updater/scenario-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';

@Component({
	selector: 'scenario-builder',
	templateUrl: './scenario-builder.component.html',
	styleUrls: ['./scenario-builder.component.scss']
})
export class ScenarioBuilderComponent implements OnInit {
	name: string;

	isNameInEditMode = false;

	@Output('delete')
	delEvent: EventEmitter<DeleteScenarioEventData> = new EventEmitter<DeleteScenarioEventData>();

	@Input()
	codeBlockId: string;

	constructor(private scenarioUpdaterService: ScenarioUpdaterService) {}

	ngOnInit() {}

	switchEditNameMode() {
		this.isNameInEditMode = !this.isNameInEditMode;
	}

	delScenario() {
		this.delEvent.emit(new DeleteScenarioEventData(this.codeBlockId));
	}

	updateName(updatedName) {
		this.scenarioUpdaterService.updateData({
			name: updatedName,
			codeBlockId: this.codeBlockId,
			updateType: EventUpdateType.UPDATE
		});
	}
}
