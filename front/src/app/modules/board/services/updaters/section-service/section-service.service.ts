import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UnknownSectionError } from '../../../errors/unknown-section.error';
import { Section } from '../../../interfaces/section.interface';
import { SectionValidatorFactory } from '../../../libs/section-validators/section-validator-factory';
import { SectionModel } from '../../../models/section.model';
import { SectionUpdateData } from '../../../interfaces/section-update.interface';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';

@Injectable({
	providedIn: 'root'
})
export class SectionServiceService {
	private sectionRepositories;

	constructor(
		validatorFactory: SectionValidatorFactory,
		private synchronizerService: BoardSocketSynchro
	) {
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
		this.synchronizerService
			.getSectionUpdateObservable()
			.subscribe((updatedSection: SectionUpdateData) => {
				this.sectionRepositories[updatedSection.name].dispatcher.next(updatedSection);
			});
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
		if (this.synchronizerService.synchonizationEnabled()) {
			this.synchronizerService.dispatchSectionUpdate({
				name: updatedSection.name,
				steps: updatedSection.steps,
				codeBlockId: updatedSection.codeBlockId
			});
		} else {
			this.sectionRepositories[updatedSection.name].dispatcher.next(updatedSection);
		}
	}
}
