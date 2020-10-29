import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { SectionUpdaterService } from "../../services/updaters/section-updater/section-updater.service";
import { FeatureAssemblyService } from "../../services/feature-assembly/feature-assembly.service";
import { Codeblock } from "../../services/feature-assembly/models/codeblock.interface";
import { Step } from "../../services/updaters/section-updater/section-updater.service";

@Component({
  selector: "section-steps",
  templateUrl: "./section-steps.component.html",
  styleUrls: ["./section-steps.component.scss"],
})
export class SectionStepsComponent implements OnInit {
  constructor(
    private sectionService: SectionUpdaterService,
    private featureAssembly: FeatureAssemblyService
  ) {}

  hasFocus = false;

  @ViewChild("inputText", { static: false })
  inputText: ElementRef;

  @Input()
  codeBlockId = "";

  @Input()
  sectionName = "";

  steps: Step[] = [];

  ngOnInit() {
    const storedCodeblock: Codeblock = this.featureAssembly.getAssembledCodeblock(
      this.codeBlockId
    );
    if (storedCodeblock) {
      this.steps = storedCodeblock.getSectionSteps(this.sectionName);
    }
    this.sectionService
      .getSectionObservable(this.sectionName)
      .subscribe((sectionUpdate) => {
        if (sectionUpdate.codeBlockId === this.codeBlockId) {
          this.steps = sectionUpdate.steps;
        }
      });
  }

  addStep() {
    if (this.inputText.nativeElement.value) {
      this.steps.push({ name: this.inputText.nativeElement.value });
      this.sectionService.updateData({
        name: this.sectionName,
        codeBlockId: this.codeBlockId,
        steps: this.steps,
      });
      this.inputText.nativeElement.value = "";
    }
  }

  delStep(step: Step) {
    const index = this.steps.findIndex((s) => s.name === step.name);
    this.steps.splice(index, 1);
    this.sectionService.updateData({
      name: this.sectionName,
      codeBlockId: this.codeBlockId,
      steps: this.steps,
    });
  }

  dropStep(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.sectionService.updateData({
      name: this.sectionName,
      codeBlockId: this.codeBlockId,
      steps: this.steps,
    });
  }

  updateStep(updatedStep: Step[]) {
    const index = this.steps.findIndex((s) => s.name === updatedStep[0].name);
    this.steps[index] = updatedStep[1];
    this.sectionService.updateData({
      name: this.sectionName,
      codeBlockId: this.codeBlockId,
      steps: this.steps,
    });
  }

  switchMode() {
    if (this.hasFocus) {
      this.addStep();
    }
    this.hasFocus = !this.hasFocus;
  }
}
