import { Component, OnInit, OnDestroy } from "@angular/core";
import { FeatureUpdaterService } from "../../services/updaters/feature-updater/feature-updater.service";
import { CodeblockUpdaterService } from "../../services/updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../../services/updaters/codeblock-updater/codeblock-updater.service";
import { MatDialog } from "@angular/material/dialog";
import { GherkinGeneratorDialogComponent } from "../gherkin-generator-dialog/gherkin-generator-dialog.component";
import { FeatureAssemblyService } from "../../services/feature-assembly/feature-assembly.service";
import { BoardLoaderService } from "../../services/board-loader/board-loader.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FeatureUpdateData } from "../../services/updaters/feature-updater/feature-updater.service";
import { CodeblockUpdateData } from "../../services/updaters/codeblock-updater/codeblock-updater.service";
import { DeleteCodeblockEventData } from "../codeblock-builder/delete-codeblock-event-data";
import { SocketManagerService } from "src/app/services/synchronizer/socket-manager/socket-manager.service";
import { SectionSynchronizerService } from "../../services/board-synchronizer/section-synchronizer.service";
import { CodeblockSynchronizerService } from "../../services/board-synchronizer/codeblock-synchronizer.service";
import { FeatureSynchronizerService } from "../../services/board-synchronizer/feature-synchronizer.service";

@Component({
  selector: "app-board-feature-page",
  templateUrl: "./board-feature-page.component.html",
  styleUrls: ["./board-feature-page.component.scss"],
})
export class BoardFeaturePageComponent implements OnInit, OnDestroy {
  scenarios: Map<string, string> = new Map<string, string>();
  backgroundId: String;

  featureName = "";
  firstEdition = false;

  constructor(
    private featureUpdaterService: FeatureUpdaterService,
    private scenarioUpdaterService: CodeblockUpdaterService,
    private featureAssemblyService: FeatureAssemblyService,
    private synchronizerService: SocketManagerService,
    private dialog: MatDialog,
    private boardLoaderService: BoardLoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.listenScenarioUpdates();
    this.featureUpdaterService
      .getObservable()
      .subscribe((featureUpdate: FeatureUpdateData) => {
        this.featureName = featureUpdate.name;
      });
    const featureIdToLoad = this.route.snapshot.paramMap.get("featureId");
    this.boardLoaderService
      .loadFeature(featureIdToLoad)
      .then(() => {
        this.synchronizerService.enableSynchronization(featureIdToLoad);
      })
      .catch((error) => {
        this.router.navigate(["/not-found"]);
      });
    if (window.history.state && window.history.state.isFirstNavigation)
      this.firstEdition = true;
  }

  ngOnDestroy(): void {
    this.synchronizerService.disableSynchronization();
  }

  listenScenarioUpdates() {
    this.scenarioUpdaterService
      .getObservable()
      .subscribe((eventData: CodeblockUpdateData) => {
        switch (eventData.updateType) {
          case EventUpdateType.DELETE:
            this.scenarios.delete(eventData.codeBlockId);
            break;
          case EventUpdateType.CREATE:
            if (eventData.isBackground) {
              this.backgroundId = eventData.codeBlockId;
            } else {
              this.scenarios.set(eventData.codeBlockId, eventData.name);
            }
            break;
        }
      });
  }

  addScenario() {
    this.scenarioUpdaterService.updateData({
      name: "",
      codeBlockId: "",
      isBackground: false,
      updateType: EventUpdateType.CREATE,
    });
  }

  delScenario(delEventData: DeleteCodeblockEventData) {
    this.scenarioUpdaterService.updateData({
      name: "",
      codeBlockId: delEventData.codeBlockId,
      isBackground: false,
      updateType: EventUpdateType.DELETE,
    });
  }

  updateName(updatedName) {
    this.featureUpdaterService.updateData({ name: updatedName });
  }

  openGenerator() {
    this.dialog.open(GherkinGeneratorDialogComponent, { width: "50%" });
  }

  shouldBeRendered(index: number, keyValueScenario: any): number {
    return keyValueScenario.key;
  }
}
