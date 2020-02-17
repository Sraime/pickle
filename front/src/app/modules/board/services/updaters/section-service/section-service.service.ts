import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UnknownSectionError } from '../../../errors/unknown-section.error';
import { Section } from '../../../interfaces/section.interface';
import { SectionValidatorFactory } from '../../../libs/section-validators/section-validator-factory';
import { SectionModel } from '../../../models/section.model';
import { SectionUpdateData } from '../../../interfaces/section-update.interface';

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

	getSectionObservable(sectionName: string): Observable<SectionUpdateData> {
		if (Object.keys(this.sectionRepositories).indexOf(sectionName) < 0) {
			throw new UnknownSectionError();
		}
		return this.sectionRepositories[sectionName].dispatcher;
	}

	updateSection(updatedSection: SectionModel) {
		if (Object.keys(this.sectionRepositories).indexOf(updatedSection.name) < 0) {
			throw new UnknownSectionError();
		}
		this.sectionRepositories[updatedSection.name].dispatcher.next({
			name: updatedSection.name,
			steps: updatedSection.steps,
			codeBlockId: updatedSection.codeBlockId
		});
	}
}
