import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScenarioService } from '../scenario/scenario.service';
import { ApiScenario } from '../scenario/api-scenario.interface';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionServiceService } from '../updaters/section-service/section-service.service';
import { SectionModel } from '../../models/section.model';

@Injectable({
	providedIn: 'root'
})
export class BoardLoaderService {
	constructor(
		private scenarioService: ScenarioService,
		private scenarioUpdater: ScenarioUpdaterService,
		private sectionUpdater: SectionServiceService
	) {}

	async loadFeature() {
		const apiScenarios: ApiScenario[] = await this.scenarioService
			.getScenariosFeature()
			.toPromise();
		apiScenarios.forEach((apiSc: ApiScenario) => {
			this.scenarioUpdater.updateData({
				name: apiSc.name,
				codeBlockId: apiSc._id,
				updateType: EventUpdateType.CREATE
			});
			this.loadScenarioSections(apiSc);
		});
	}

	private loadScenarioSections(scenario: ApiScenario) {
		this.loadScenarioSection(scenario, 'Given');
		this.loadScenarioSection(scenario, 'When');
		this.loadScenarioSection(scenario, 'Then');
	}

	private loadScenarioSection(scenario: ApiScenario, sectionName: string) {
		if (scenario[sectionName.toLowerCase() + 'Steps'].length > 0) {
			this.sectionUpdater.updateSection(
				new SectionModel(sectionName, scenario._id, scenario[sectionName.toLowerCase() + 'Steps'])
			);
		}
	}
}
