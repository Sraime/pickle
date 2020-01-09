import { Component, OnInit } from '@angular/core';
import { SectionServiceService } from '../../services/section-service/section-service.service';
import { Section } from '../../interfaces/section';

@Component({
  selector: 'gherkin-generator',
  templateUrl: './gherkin-generator.component.html',
  styleUrls: ['./gherkin-generator.component.scss']
})
export class GherkinGeneratorComponent implements OnInit {
  private sections: Section[] = [];
  private sectionOrder: string[] = ['Given', 'When', 'Then'];
  // tslint:disable-next-line: ban-types
  private isValid: Boolean = null;

  constructor(private service: SectionServiceService) {}


  ngOnInit() {
    this.sectionOrder.forEach((sectionName, index) => {
      this.service.getSectionObservable(sectionName)
        .subscribe((s) => {
          this.sections[index] = s;
          this.updateGenerationState();
        });
    });
  }

  updateGenerationState() {
    let nState = this.sections.length === this.sectionOrder.length;
    if (nState) {
      for (const section of this.sections) {
        nState = nState && section !== undefined && section.isValid;
      }
    }
    this.isValid = nState;
  }
}
