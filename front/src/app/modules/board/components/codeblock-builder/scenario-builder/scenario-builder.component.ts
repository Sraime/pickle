import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CodeblockUpdaterService } from "../../../services/updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../../../services/updaters/codeblock-updater/codeblock-updater.service";
import { CodeblockBuilderComponent } from "../codeblock-builder.component";

@Component({
  selector: "scenario-builder",
  templateUrl: "../codeblock-builder.component.html",
  styleUrls: ["../codeblock-builder.component.scss"],
})
export class ScenarioBuilderComponent extends CodeblockBuilderComponent
  implements OnInit {
  constructor(private scenarioUpdaterService: CodeblockUpdaterService) {
    super();
    this.sectionNames = ["Given", "When", "Then"];
    this.codeblockLabel = "Scenario";
  }

  ngOnInit() {
    this.scenarioUpdaterService.getObservable().subscribe((data) => {
      if (
        data.codeBlockId === this.codeBlockId &&
        data.updateType === EventUpdateType.UPDATE
      ) {
        this.codeblockName = data.name;
      }
    });
  }

  updateName(updatedName: string) {
    this.scenarioUpdaterService.updateData({
      name: updatedName,
      codeBlockId: this.codeBlockId,
      isBackground: false,
      updateType: EventUpdateType.UPDATE,
    });
  }
}
