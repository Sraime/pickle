import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Step } from '../../../interfaces/step';

@Component({
  selector: 'section-step-item',
  templateUrl: './section-step-item.component.html',
  styleUrls: ['./section-step-item.component.css']
})
export class SectionStepItemComponent implements OnInit {

  constructor() { }

  @Input()
  name: string = '';

  @Output('delete')
  delEvent: EventEmitter<Step> = new EventEmitter<Step>();

  ngOnInit() {
  }

  delAction() {
    this.delEvent.emit({name: this.name});
  }

}
