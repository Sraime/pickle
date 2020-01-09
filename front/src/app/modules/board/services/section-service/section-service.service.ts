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
	private sectionRepositories;

	constructor(validatorFactory: SectionValidatorFactory) {
		this.sectionRepositories = {
			Given: {
				validator: validatorFactory.getSectionValidator('Given'),
				dispatcher: new Subject<Section>()
			},
			When: {
				validator: validatorFactory.getSectionValidator('When'),
				dispatcher: new Subject<Section>()
			},
			Then: {
				validator: validatorFactory.getSectionValidator('Then'),
				dispatcher: new Subject<Section>()
			}
		};
	}

	getSectionObservable(sectionName: string): Observable<Section> {
		if (Object.keys(this.sectionRepositories).indexOf(sectionName) < 0) {
			throw new UnknownSectionError();
		}
		return this.sectionRepositories[sectionName].dispatcher;
	}

	updateSection(sectionName: string, steps: Step[]) {
		if (Object.keys(this.sectionRepositories).indexOf(sectionName) < 0) {
			throw new UnknownSectionError();
		}
		const valid = this.sectionRepositories[sectionName].validator.validate(steps);
		this.sectionRepositories[sectionName].dispatcher.next({ name: sectionName, isValid: valid, steps });
	}
}
