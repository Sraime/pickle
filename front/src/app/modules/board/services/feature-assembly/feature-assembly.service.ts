import { Injectable } from '@angular/core';
import { FeatureUpdaterService } from '../updaters/feature-updater/feature-updater.service';
import { Feature } from '../../interfaces/feature.interface';
import { FeatureUpdateData } from '../../interfaces/feature-update-data.interface';
import { ScenarioUpdaterService } from '../updaters/scenario-updater/scenario-updater.service';
import { Scenario } from '../../interfaces/scenario.interface';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { Subscription } from 'rxjs';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';
import { SectionServiceService } from '../updaters/section-service/section-service.service';

@Injectable({
	providedIn: 'root'
})
export class FeatureAssemblyService {
	private featureName = '';
	private scenarios: Map<string, Scenario> = new Map();

	private subscriptions: Subscription[] = [];

	constructor(
		featureUpdaterService: FeatureUpdaterService,
		scenarioUpdaterService: ScenarioUpdaterService,
		sectionService: SectionServiceService
	) {
		this.listenFeatureEvents(featureUpdaterService);
		this.listenScenarioEvents(scenarioUpdaterService);
		this.listenSectionsEvents(sectionService);
	}

	getAssembledFeature(): Feature {
		return { name: this.featureName, scenarios: Array.from(this.scenarios.values()) };
	}

	getAssembledScenario(codeBlockId: string): Scenario {
		const stored = this.scenarios.get(codeBlockId);
		return stored ? stored : null;
	}

	stopListenning(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	private listenSectionsEvents(sectionService) {
		const listenedSectionNames = ['Given', 'When', 'Then'];
		listenedSectionNames.forEach((sectionName) => {
			this.subscriptions.push(
				sectionService.getSectionObservable(sectionName).subscribe((updatedSection) => {
					const s = this.scenarios.get(updatedSection.codeBlockId);
					s[sectionName.toLowerCase() + 'Steps'] = updatedSection.steps;
				})
			);
		});
	}

	private listenFeatureEvents(featureUpdaterService) {
		this.subscriptions.push(
			featureUpdaterService.getObservable().subscribe((update: FeatureUpdateData) => {
				this.featureName = update.name;
			})
		);
	}

	private listenScenarioEvents(scenarioUpdaterService) {
		this.subscriptions.push(
			scenarioUpdaterService.getObservable().subscribe((update: ScenarioUpdateData) => {
				switch (update.updateType) {
					case EventUpdateType.DELETE:
						this.scenarios.delete(update.codeBlockId);
						break;
					case EventUpdateType.UPDATE:
						const s = this.scenarios.get(update.codeBlockId);
						s.name = update.name;
						break;
					case EventUpdateType.CREATE:
						this.scenarios.set(update.codeBlockId, {
							name: update.name,
							givenSteps: [],
							whenSteps: [],
							thenSteps: []
						});
				}
			})
		);
	}
}
