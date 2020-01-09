import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../interfaces/step';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SectionServiceService } from '../../services/section-service/section-service.service';

@Component({
  selector: 'section-steps',
  templateUrl: './section-steps.component.html',
  styleUrls: ['./section-steps.component.scss']
})
export class SectionStepsComponent implements OnInit {

  constructor(private sectionService: SectionServiceService) { }

  @Input()
  sectionName = '';

  steps: Step[] = [];

  ngOnInit() {
    this.sectionService.getSectionObservable(this.sectionName)
      .subscribe((sectionUpdate) => {
        this.steps = sectionUpdate.steps;
      });
  }

  addStep(e) {
    if (e.srcElement.value) {
      this.steps.push({name: e.srcElement.value});
      this.sectionService.updateSection(this.sectionName, this.steps);
      e.srcElement.value = '';
    }
  }

  delStep(step: Step) {
    const index = this.steps.findIndex(s => s.name === step.name);
    this.steps.splice(index, 1);
    this.sectionService.updateSection(this.sectionName, this.steps);
  }

  dropStep(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.sectionService.updateSection(this.sectionName, this.steps);
  }

}
