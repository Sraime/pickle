import { Injectable } from "@angular/core";
import { CodeblockService } from "../api/codeblock/codeblock.service";
import { ApiCodeblock } from "../api/codeblock/api-codeblock.interface";
import { CodeblockUpdaterService } from "../updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../updaters/codeblock-updater/EventUpdateType.enums";
import { SectionUpdaterService } from "../updaters/section-updater/section-updater.service";
import { ApiFeature } from "../api/feature/api-feature.interface";
import { FeatureService } from "../api/feature/feature.service";
import { FeatureUpdaterService } from "../updaters/feature-updater/feature-updater.service";

@Injectable({
  providedIn: "root"
})
export class BoardLoaderService {
  constructor(
    private featureService: FeatureService,
    private scenarioService: CodeblockService,
    private scenarioUpdater: CodeblockUpdaterService,
    private sectionUpdater: SectionUpdaterService,
    private featureUpdater: FeatureUpdaterService
  ) {}

  async loadFeature(featureId: string = "") {
    const apiFeature: ApiFeature = await this.featureService
      .getFeature(featureId)
      .toPromise();
    if (!apiFeature) {
      throw new Error("This feature does not exist");
    }
    this.featureUpdater.updateData({
      name: apiFeature.name ? apiFeature.name : ""
    });
    const apiScenarios: ApiCodeblock[] = await this.scenarioService
      .getCodeblocksFeature(featureId)
      .toPromise();
    apiScenarios.forEach((apiSc: ApiCodeblock) => {
      this.scenarioUpdater.updateData({
        name: apiSc.name,
        codeBlockId: apiSc._id,
        isBackground: apiSc.isBackground,
        updateType: EventUpdateType.CREATE
      });
      this.loadScenarioSections(apiSc);
    });
  }

  private loadScenarioSections(scenario: ApiCodeblock) {
    this.loadScenarioSection(scenario, "Given");
    this.loadScenarioSection(scenario, "When");
    this.loadScenarioSection(scenario, "Then");
  }

  private loadScenarioSection(scenario: ApiCodeblock, sectionName: string) {
    if (scenario[sectionName.toLowerCase() + "Steps"].length > 0) {
      this.sectionUpdater.updateSection({
        name: sectionName,
        codeBlockId: scenario._id,
        steps: scenario[sectionName.toLowerCase() + "Steps"]
      });
    }
  }
}
