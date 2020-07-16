import { TestBed } from "@angular/core/testing";

import { FeatureAssemblyService } from "./feature-assembly.service";
import { Feature } from "./models/feature.interface";
import { FeatureUpdaterService } from "../updaters/feature-updater/feature-updater.service";
import { Subject } from "rxjs";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-update-data.interface";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-update-data.interface";
import { CodeblockUpdaterService } from "../updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../updaters/codeblock-updater/EventUpdateType.enums";
import { SectionUpdaterService } from "../updaters/section-updater/section-updater.service";
import { SectionUpdateData } from "../updaters/section-updater/section-update.interface";

describe("FeatureAssemblyService", () => {
  let service: FeatureAssemblyService;
  const subjectFeatureObservable = new Subject<FeatureUpdateData>();
  const subjectScenarioObservable = new Subject<CodeblockUpdateData>();
  const subjectSectionObservable = new Subject<SectionUpdateData>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureUpdaterService,
          useValue: {
            getObservable: jest
              .fn()
              .mockReturnValue(subjectFeatureObservable.asObservable())
          }
        },
        {
          provide: CodeblockUpdaterService,
          useValue: {
            getObservable: jest
              .fn()
              .mockReturnValue(subjectScenarioObservable.asObservable())
          }
        },
        {
          provide: SectionUpdaterService,
          useValue: {
            getSectionObservable: jest
              .fn()
              .mockReturnValue(subjectSectionObservable.asObservable())
          }
        }
      ]
    });
  });

  const simpleScenarioCreated: CodeblockUpdateData = {
    name: "First Scenario",
    codeBlockId: "S1",
    isBackground: false,
    updateType: EventUpdateType.CREATE
  };

  const simpleScenarioUpdated: CodeblockUpdateData = {
    name: "First Scenario Update",
    codeBlockId: "S1",
    isBackground: false,
    updateType: EventUpdateType.UPDATE
  };

  const simpleBackgroundCreated: CodeblockUpdateData = {
    name: "",
    codeBlockId: "BG",
    isBackground: true,
    updateType: EventUpdateType.CREATE
  };

  beforeEach(() => {
    service = TestBed.get(FeatureAssemblyService);
  });

  afterEach(() => {
    service.stopListenning();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("Feature code generation", () => {
    let assembledFeature: Feature;

    it("should return an empty feature by default", () => {
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature).toEqual({
        name: "",
        background: null,
        scenarios: []
      });
    });

    it("should update the feature name after receiving a feature event", () => {
      subjectFeatureObservable.next({ name: "amazing feature" });
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature).toEqual({
        name: "amazing feature",
        background: null,
        scenarios: []
      });
    });

    it("should add a scenario in the feature when it is not registered", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.scenarios[0].name).toEqual("First Scenario");
    });

    it("should not add background in scenarios", () => {
      subjectScenarioObservable.next(simpleBackgroundCreated);
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.scenarios.length).toEqual(0);
    });

    it("should update the scenario name when it is already registered", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      subjectScenarioObservable.next(simpleScenarioUpdated);
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.scenarios[0].name).toEqual(
        "First Scenario Update"
      );
    });

    it("should delete the scenario after receiving a delete event", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      subjectScenarioObservable.next({
        name: "",
        codeBlockId: "S1",
        isBackground: false,
        updateType: EventUpdateType.DELETE
      });
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.scenarios).toEqual([]);
    });

    const sections = ["Given", "When", "Then"];
    sections.forEach(sectionName => {
      it(
        "should update the section steps " +
          sectionName +
          " when it is updated for a registered scenario",
        () => {
          subjectScenarioObservable.next(simpleScenarioCreated);
          subjectSectionObservable.next({
            name: sectionName,
            steps: [{ name: "step1" }],
            codeBlockId: "S1"
          });
          assembledFeature = service.getAssembledFeature();

          expect(
            assembledFeature.scenarios[0].getSectionSteps(sectionName)
          ).toEqual([{ name: "step1" }]);
        }
      );
    });

    it("should update given steps section of the background", () => {
      subjectScenarioObservable.next(simpleBackgroundCreated);
      subjectSectionObservable.next({
        name: "Given",
        steps: [{ name: "step1" }],
        codeBlockId: "BG"
      });
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.background.getSectionSteps("Given")).toEqual([
        { name: "step1" }
      ]);
    });

    it("should not remove steps when a scenario is updated", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      subjectSectionObservable.next({
        name: "Given",
        steps: [{ name: "step1" }],
        codeBlockId: "S1"
      });
      assembledFeature = service.getAssembledFeature();

      expect(assembledFeature.scenarios[0].getSectionSteps("Given")).toEqual([
        { name: "step1" }
      ]);
    });

    it("should not try to update an unexisting scenario", () => {
      subjectScenarioObservable.next(simpleScenarioUpdated);
      assembledFeature = service.getAssembledFeature();
      expect(assembledFeature.scenarios).toEqual([]);
    });
  });

  describe("scenario assemblage", () => {
    it("should return the assembled scenario with the given codeBlockId", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      const assembledScenario = service.getAssembledScenario(
        simpleScenarioCreated.codeBlockId
      );
      expect(assembledScenario.name).toEqual("First Scenario");
    });

    it("should return null when there is no scenario with the given codeBlockId", () => {
      const assembledScenario = service.getAssembledScenario("xxx");
      expect(assembledScenario).toEqual(null);
    });
  });

  describe("codeblock assemblage", () => {
    it("should return the assembled scenario with the given codeBlockId", () => {
      subjectScenarioObservable.next(simpleScenarioCreated);
      const assembledCodeblock = service.getAssembledCodeblock(
        simpleScenarioCreated.codeBlockId
      );
      expect(assembledCodeblock).toBeTruthy();
    });

    it("should return the assembled background with the given codeBlockId", () => {
      subjectScenarioObservable.next(simpleBackgroundCreated);
      const assembledCodeblock = service.getAssembledCodeblock(
        simpleBackgroundCreated.codeBlockId
      );
      expect(assembledCodeblock).toBeTruthy();
    });

    it("should return null when there is no scenario with this codeBlockId and there is no background ", () => {
      const assembledCodeblock = service.getAssembledCodeblock("xxx");
      expect(assembledCodeblock).toEqual(null);
    });

    it("should return null when neither scenarios and background corresponds to the given codeBlockId", () => {
      subjectScenarioObservable.next(simpleBackgroundCreated);
      const assembledCodeblock = service.getAssembledCodeblock("xxx");
      expect(assembledCodeblock).toEqual(null);
    });
  });
});
