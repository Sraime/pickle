import { Injectable } from "@angular/core";
import { FeatureUpdaterService } from "../updaters/feature-updater/feature-updater.service";
import { Feature } from "./models/feature.interface";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-updater.service";
import { CodeblockUpdaterService } from "../updaters/codeblock-updater/codeblock-updater.service";
import { Scenario } from "./models/scenario/scenario.class";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-updater.service";
import { Subscription } from "rxjs";
import { EventUpdateType } from "../updaters/codeblock-updater/codeblock-updater.service";
import { SectionUpdaterService } from "../updaters/section-updater/section-updater.service";
import { Background } from "./models/background/background.class";
import { SectionUpdateData } from "../updaters/section-updater/section-updater.service";
import { KeyValue } from "@angular/common";
import { Codeblock } from "./models/codeblock.interface";

@Injectable({
  providedIn: "root",
})
export class FeatureAssemblyService {
  private featureName = "";
  private scenarios: Map<string, Scenario> = new Map();
  private background: KeyValue<string, Background>;

  private subscriptions: Subscription[] = [];

  constructor(
    featureUpdaterService: FeatureUpdaterService,
    scenarioUpdaterService: CodeblockUpdaterService,
    sectionService: SectionUpdaterService
  ) {
    this.listenFeatureEvents(featureUpdaterService);
    this.listenCodeblocksEvents(scenarioUpdaterService);
    this.listenSectionsEvents(sectionService);
  }

  getAssembledFeature(): Feature {
    const backgroundValue: Background = this.background
      ? this.background.value
      : null;
    return {
      name: this.featureName,
      background: backgroundValue,
      scenarios: Array.from(this.scenarios.values()),
    };
  }

  getAssembledScenario(codeBlockId: string): Scenario {
    const stored = this.scenarios.get(codeBlockId);
    return stored ? stored : null;
  }

  getAssembledCodeblock(codeBlockId: string): Codeblock {
    const stored = this.getAssembledScenario(codeBlockId);
    if (stored) {
      return stored;
    }
    return this.background && codeBlockId === this.background.key
      ? this.background.value
      : null;
  }

  stopListenning(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private listenSectionsEvents(sectionService) {
    const listenedSectionNames = ["Given", "When", "Then"];
    listenedSectionNames.forEach((sectionName) => {
      this.subscriptions.push(
        sectionService
          .getSectionObservable(sectionName)
          .subscribe((updatedSection: SectionUpdateData) => {
            if (
              this.background &&
              updatedSection.codeBlockId === this.background.key
            ) {
              this.background.value.setSectionSteps(
                "Given",
                updatedSection.steps
              );
            } else {
              const s = this.scenarios.get(updatedSection.codeBlockId);
              s.setSectionSteps(sectionName, updatedSection.steps);
            }
          })
      );
    });
  }

  private listenFeatureEvents(featureUpdaterService) {
    this.subscriptions.push(
      featureUpdaterService
        .getObservable()
        .subscribe((update: FeatureUpdateData) => {
          this.featureName = update.name;
        })
    );
  }

  private listenCodeblocksEvents(scenarioUpdaterService) {
    this.subscriptions.push(
      scenarioUpdaterService
        .getObservable()
        .subscribe((update: CodeblockUpdateData) => {
          switch (update.updateType) {
            case EventUpdateType.DELETE:
              this.scenarios.delete(update.codeBlockId);
              break;
            case EventUpdateType.UPDATE:
              const s = this.scenarios.get(update.codeBlockId);
              s.name = update.name;
              break;
            case EventUpdateType.CREATE:
              if (update.isBackground) {
                this.background = {
                  key: update.codeBlockId,
                  value: new Background(),
                };
              } else {
                this.scenarios.set(
                  update.codeBlockId,
                  new Scenario(update.name)
                );
              }
          }
        })
    );
  }
}
