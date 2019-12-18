import { SectionValidator } from './section-validator';
import { Injectable } from '@angular/core';
import { NotEmptySectionValidator } from './notempty/notempty-section-validator';
import { UnknownSectionError } from '../../errors/unknown-section.error';

@Injectable({
    providedIn: 'root'
})
export class SectionValidatorFactory {

    private registeredSections: string[] = ['Given', 'When', 'Then'];

    getSectionValidator(sectionName: string): SectionValidator {
        if(this.registeredSections.indexOf(sectionName) < 0 )
            throw new UnknownSectionError();
        return new NotEmptySectionValidator();
    }
}