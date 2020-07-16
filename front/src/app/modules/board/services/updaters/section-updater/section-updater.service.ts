import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UnknownSectionError } from "../../../errors/unknown-section.error";
import { SectionValidatorFactory } from "../../../libs/section-validators/section-validator-factory";
import { SectionUpdateData } from "./section-update.interface";
import { BoardSocketSynchro } from "../../board-synchronizer/board-socket-synchro.service";

@Injectable({
  providedIn: "root"
})
export class SectionUpdaterService {
  private sectionRepositories;

  constructor(
    validatorFactory: SectionValidatorFactory,
    private synchronizerService: BoardSocketSynchro
  ) {
    this.sectionRepositories = {
      Given: {
        validator: validatorFactory.getSectionValidator("Given"),
        dispatcher: new Subject<SectionUpdateData>()
      },
      When: {
        validator: validatorFactory.getSectionValidator("When"),
        dispatcher: new Subject<SectionUpdateData>()
      },
      Then: {
        validator: validatorFactory.getSectionValidator("Then"),
        dispatcher: new Subject<SectionUpdateData>()
      }
    };
    this.synchronizerService
      .getSectionUpdateObservable()
      .subscribe((updatedSection: SectionUpdateData) => {
        this.sectionRepositories[updatedSection.name].dispatcher.next(
          updatedSection
        );
      });
  }

  getSectionObservable(sectionName: string): Observable<SectionUpdateData> {
    if (Object.keys(this.sectionRepositories).indexOf(sectionName) < 0) {
      throw new UnknownSectionError();
    }
    return this.sectionRepositories[sectionName].dispatcher;
  }

  updateSection(updatedSection: SectionUpdateData) {
    if (
      Object.keys(this.sectionRepositories).indexOf(updatedSection.name) < 0
    ) {
      throw new UnknownSectionError();
    }
    if (this.synchronizerService.synchonizationEnabled()) {
      this.synchronizerService.dispatchSectionUpdate({
        name: updatedSection.name,
        steps: updatedSection.steps,
        codeBlockId: updatedSection.codeBlockId
      });
    } else {
      this.sectionRepositories[updatedSection.name].dispatcher.next(
        updatedSection
      );
    }
  }
}
