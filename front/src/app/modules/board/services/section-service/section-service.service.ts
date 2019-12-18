import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Step } from '../../interfaces/step';
import { UnknownSectionError } from '../../errors/unknown-section.error';
import { Section } from '../../interfaces/section';
import { SectionValidatorFactory } from '../../libs/section-validators/section-validator-factory';

@Injectable({
  providedIn: 'root'
})
export class SectionServiceService {

  private validators;

  private dispatcher: Subject<Section> = new Subject<Section>();
  constructor(validatorFactory: SectionValidatorFactory) { 
    this.validators = {
      Given: validatorFactory.getSectionValidator('Given'),
      When: validatorFactory.getSectionValidator('When'),
      Then: validatorFactory.getSectionValidator('Then')
    }
  }

  getSectionObservable(sectionName: string) :Observable<Section> {
    if(Object.keys(this.validators).indexOf(sectionName) < 0)
      throw new UnknownSectionError();
    return this.dispatcher;
  }

  updateSection(sectionName: string, steps: Step[]) {
    if(Object.keys(this.validators).indexOf(sectionName) < 0)
      throw new UnknownSectionError();
    let valid = this.validators[sectionName].validate(steps);
    this.dispatcher.next({name: sectionName, isValid: valid, steps: steps});
  }
}
