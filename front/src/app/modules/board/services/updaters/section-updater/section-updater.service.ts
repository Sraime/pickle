import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UnknownSectionError } from "../../../errors/unknown-section.error";
import { SectionValidatorFactory } from "../../../libs/section-validators/section-validator-factory";
import { SynchronizedUpdater } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { SectionSynchronizerService } from "../../board-synchronizer/section-synchronizer.service";
import { UpdateDataObject } from "src/app/services/updater/updater.interface";

export interface Step {
  name: string;
}

export interface SectionUpdateData extends UpdateDataObject {
  name: string;
  steps: Array<Step>;
  codeBlockId: string;
}

@Injectable({
  providedIn: "root",
})
export class SectionUpdaterService extends SynchronizedUpdater<
  SectionUpdateData
> {
  private sectionRepositories;

  constructor(
    validatorFactory: SectionValidatorFactory,
    private synchronizerService: SectionSynchronizerService
  ) {
    super(synchronizerService);
    this.sectionRepositories = {
      Given: {
        validator: validatorFactory.getSectionValidator("Given"),
        dispatcher: new Subject<SectionUpdateData>(),
      },
      When: {
        validator: validatorFactory.getSectionValidator("When"),
        dispatcher: new Subject<SectionUpdateData>(),
      },
      Then: {
        validator: validatorFactory.getSectionValidator("Then"),
        dispatcher: new Subject<SectionUpdateData>(),
      },
    };
    this.synchronizerService.addCallback(
      (updatedSection: SectionUpdateData) => {
        this.sectionRepositories[updatedSection.name].dispatcher.next(
          updatedSection
        );
      }
    );
  }

  getSectionObservable(sectionName: string): Observable<SectionUpdateData> {
    if (Object.keys(this.sectionRepositories).indexOf(sectionName) < 0) {
      throw new UnknownSectionError();
    }
    return this.sectionRepositories[sectionName].dispatcher;
  }

  updateData(updatedSection: SectionUpdateData) {
    if (
      Object.keys(this.sectionRepositories).indexOf(updatedSection.name) < 0
    ) {
      throw new UnknownSectionError();
    }
    if (this.synchronizerService.synchonizationEnabled()) {
      this.synchronizerService.pushData({
        name: updatedSection.name,
        steps: updatedSection.steps,
        codeBlockId: updatedSection.codeBlockId,
      });
    } else {
      this.sectionRepositories[updatedSection.name].dispatcher.next(
        updatedSection
      );
    }
  }
}
