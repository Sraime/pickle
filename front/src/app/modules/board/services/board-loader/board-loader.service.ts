import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScenarioService } from '../api/scenario/scenario.service';
import { ApiScenario } from '../api/scenario/api-scenario.interface';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionUpdaterService } from '../updaters/section-updater/section-updater.service';
import { SectionModel } from '../../models/section.model';
import { ApiFeature } from '../api/feature/api-feature.interface';
import { FeatureService } from '../api/feature/feature.service';
import { FeatureUpdaterService } from '../updaters/feature-updater/feature-updater.service';

@Injectable({
	providedIn: 'root'
})
export class BoardLoaderService {
	constructor(
		private featureService: FeatureService,
		private scenarioService: ScenarioService,
		private scenarioUpdater: ScenarioUpdaterService,
		private sectionUpdater: SectionUpdaterService,
		private featureUpdater: FeatureUpdaterService
	) {}

	async loadFeature(featureId: string = '') {
		const apiFeature: ApiFeature = await this.featureService.getFeature(featureId).toPromise();
		if (!apiFeature) {
			throw new Error('This feature does not exist');
		}
		this.featureUpdater.updateData({ name: apiFeature.name });
		const apiScenarios: ApiScenario[] = await this.scenarioService
			.getScenariosFeature(featureId)
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
