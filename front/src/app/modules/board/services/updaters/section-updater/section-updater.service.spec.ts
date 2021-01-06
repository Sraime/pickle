import { TestBed } from "@angular/core/testing";

import { SectionUpdaterService } from "./section-updater.service";
import { Observable, Subject } from "rxjs";
import { Step } from "./section-updater.service";
import { SectionValidatorFactory } from "../../../libs/section-validators/section-validator-factory";
import { SectionUpdateData } from "./section-updater.service";

jest.mock("../../board-synchronizer/board-socket-synchro.service");
import { SectionSynchronizerService } from "../../board-synchronizer/section-synchronizer.service";

describe("SectionUpdaterService", () => {
  let MockBoardSocketSynchro: jest.Mocked<SectionSynchronizerService>;
  let service: SectionUpdaterService;
  let stubGetValidator;
  let stubsValidate;
  let EventSubjectSocketSection;
  MockBoardSocketSynchro = new (SectionSynchronizerService as any)();

  beforeEach(() => {
    EventSubjectSocketSection = new Subject<SectionUpdateData>();
    stubsValidate = {};
    stubsValidate.Given = jest.fn().mockReturnValue(true);
    stubsValidate.When = jest.fn().mockReturnValue(true);
    stubsValidate.Then = jest.fn().mockReturnValue(true);
    stubGetValidator = jest.fn().mockImplementation((sn) => {
      if (sn === "Given") {
        return { validate: stubsValidate.Given };
      }
      if (sn === "When") {
        return { validate: stubsValidate.When };
      }
      if (sn === "Then") {
        return { validate: stubsValidate.Then };
      }
    });
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SectionValidatorFactory,
          useValue: {
            getSectionValidator: stubGetValidator,
          },
        },
        {
          provide: SectionSynchronizerService,
          useValue: MockBoardSocketSynchro,
        },
      ],
    });
    MockBoardSocketSynchro.getSectionUpdateObservable.mockReturnValue(
      EventSubjectSocketSection
    );
    service = TestBed.get(SectionUpdaterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  const sections = ["Given", "When", "Then"];

  it("should get all section validators from the factory", () => {
    expect(stubGetValidator).toBeCalledWith("Given");
    expect(stubGetValidator).toBeCalledWith("When");
    expect(stubGetValidator).toBeCalledWith("Then");
  });

  sections.forEach((section) => {
    describe("section " + section + " subscription", () => {
      it("should return an observable for the " + section + " section", () => {
        let obs: Observable<SectionUpdateData>;
        obs = service.getSectionObservable(section);
        expect(obs).toBeTruthy();
      });

      it("should dispatch the updated section", (done) => {
        const updatedSteps: Step[] = [{ name: "step1" }, { name: "step2" }];
        const expectedUpdate = {
          name: section,
          steps: updatedSteps,
          codeBlockId: "codeBlockId",
        };

        service.getSectionObservable(section).subscribe((steps) => {
          expect(steps).toEqual(expectedUpdate);
          done();
        });
        EventSubjectSocketSection.next(expectedUpdate);
      });
    });

    describe("update data", () => {
      const simpleSectionUpdateData: SectionUpdateData = {
        name: section,
        codeBlockId: "codeBlockId",
        steps: [],
      };
      beforeEach(() => {
        MockBoardSocketSynchro.synchonizationEnabled.mockReturnValue(true);
      });

      it("should dispatch the updated only for the updated section", () => {
        let nbCall = 0;
        service.getSectionObservable("Given").subscribe((s) => {
          nbCall++;
        });
        service.getSectionObservable("When").subscribe((s) => {
          nbCall++;
        });
        service.getSectionObservable("Then").subscribe((s) => {
          nbCall++;
        });
        EventSubjectSocketSection.next(simpleSectionUpdateData);
        expect(nbCall).toEqual(1);
      });

      it("should throw an expection when requesting an innexiting section", () => {
        try {
          service.getSectionObservable("NOT_EXISTING_SECTION");
        } catch (e) {
          expect(e.name).toEqual("UnknownSectionException");
          expect(e.message).toEqual("this section does not exist");
        }
      });

      it("should throw an expection when updating an innexiting section", () => {
        try {
          service.updateData(simpleSectionUpdateData);
        } catch (e) {
          expect(e.name).toEqual("UnknownSectionException");
          expect(e.message).toEqual("this section does not exist");
        }
      });

      it("should dispatch the update through the synchronizer service when synchro is enabled", () => {
        service.updateData(simpleSectionUpdateData);
        expect(
          MockBoardSocketSynchro.dispatchSectionUpdate
        ).toHaveBeenCalledWith({
          name: section,
          codeBlockId: "codeBlockId",
          steps: [],
        });
      });

      it("should dispatch the update localy when synchro is not enabled", async (done) => {
        MockBoardSocketSynchro.synchonizationEnabled.mockReturnValue(false);
        const sectionData = {
          name: section,
          codeBlockId: "codeBlockId",
          steps: [],
        };
        service.getSectionObservable(section).subscribe((updated) => {
          expect(updated).toEqual(sectionData);
          done();
        });
        service.updateData(sectionData);
      });
    });
  });
});
