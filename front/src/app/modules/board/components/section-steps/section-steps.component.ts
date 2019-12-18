import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../interfaces/step';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SectionServiceService } from '../../services/section-service/section-service.service';

@Component({
  selector: 'section-steps',
  templateUrl: './section-steps.component.html',
  styleUrls: ['./section-steps.component.css']
})
export class SectionStepsComponent implements OnInit {

  constructor(private sectionService: SectionServiceService) { }

  ngOnInit() {
    this.sectionService.getSectionObservable(this.sectionName)
      .subscribe((sectionUpdate) => {
        this.steps = sectionUpdate.steps.map(s => s.name);
      });
  }

  @Input()
  sectionName: string = "";
  
  steps: string[] = [];

  addStep(e) {
    if(e.srcElement.value){
      let nStepList: Step[] = this.steps.map<Step>((s) => {return {name: s}});
      nStepList.push({name: e.srcElement.value})
      this.sectionService.updateSection(this.sectionName,nStepList);
      e.srcElement.value = '';
    }
  }

  delStep(step: Step) {
    let index = this.steps.findIndex(s => s === step.name);
    this.steps.splice(index, 1);
  }

  dropStep(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }
  
}
