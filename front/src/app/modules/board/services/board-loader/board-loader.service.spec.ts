import { TestBed } from "@angular/core/testing";

import { BoardLoaderService } from "./board-loader.service";
import { FeatureService } from "../api/feature/feature.service";
import { CodeblockService } from "../api/codeblock/codeblock.service";
import { ApiCodeblock } from "../api/codeblock/api-codeblock.interface";
import { of } from "rxjs";
import { CodeblockUpdaterService } from "../updaters/codeblock-updater/codeblock-updater.service";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-update-data.interface";
import { EventUpdateType } from "../updaters/codeblock-updater/EventUpdateType.enums";
import { SectionUpdaterService } from "../updaters/section-updater/section-updater.service";
import { ApiFeature } from "../api/feature/api-feature.interface";
import { FeatureUpdaterService } from "../updaters/feature-updater/feature-updater.service";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-update-data.interface";

jest.mock("../api/feature/feature.service");
jest.mock("../api/codeblock/codeblock.service");
jest.mock("../updaters/codeblock-updater/codeblock-updater.service");
jest.mock("../updaters/section-updater/section-updater.service");
jest.mock("../updaters/feature-updater/feature-updater.service");

describe("BoardLoaderService", () => {
  let service: BoardLoaderService;
  const mockFeatureService: jest.Mocked<FeatureService> = new FeatureService(
    null
  ) as jest.Mocked<FeatureService>;
  const mockScenarioService: jest.Mocked<CodeblockService> = new CodeblockService(
    null
  ) as jest.Mocked<CodeblockService>;
  const mockScenarioUpdater: jest.Mocked<CodeblockUpdaterService> = new CodeblockUpdaterService(
    null
  ) as jest.Mocked<CodeblockUpdaterService>;
  const mockSectionUpdater: jest.Mocked<SectionUpdaterService> = new SectionUpdaterService(
    null,
    null
  ) as jest.Mocked<SectionUpdaterService>;
  const mockFeatureUpdater: jest.Mocked<FeatureUpdaterService> = new FeatureUpdaterService(
    null
  ) as jest.Mocked<FeatureUpdaterService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureService,
          useValue: mockFeatureService
        },
        {
          provide: CodeblockService,
          useValue: mockScenarioService
        },
        {
          provide: CodeblockUpdaterService,
          useValue: mockScenarioUpdater
        },
        {
          provide: SectionUpdaterService,
          useValue: mockSectionUpdater
        },

        {
          provide: FeatureUpdaterService,
          useValue: mockFeatureUpdater
        }
      ]
    });
    service = TestBed.inject(BoardLoaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("loadFeature()", () => {
    const apiScenarios: ApiCodeblock[] = [
      {
        _id: "xxx",
        name: "s1",
        isBackground: false,
        givenSteps: [{ name: "step1" }],
        whenSteps: [{ name: "step2" }],
        thenSteps: [{ name: "step3" }]
      },
      {
        _id: "yyy",
        name: "s2",
        isBackground: false,
        givenSteps: [],
        whenSteps: [],
        thenSteps: []
      }
    ];

    const apiFeature: ApiFeature = {
      _id: "fid",
      name: "my feature"
    };

    beforeEach(() => {
      mockFeatureService.getFeature.mockReturnValue(of(apiFeature));
      mockScenarioService.getCodeblocksFeature.mockReturnValue(
        of(apiScenarios)
      );
    });

    afterEach(() => {
      mockScenarioService.getCodeblocksFeature.mockClear();
      mockScenarioUpdater.updateData.mockClear();
      mockSectionUpdater.updateSection.mockClear();
    });

    it("should request the feature service with the given feature id", async () => {
      await service.loadFeature(apiFeature._id);
      expect(mockFeatureService.getFeature).toHaveBeenCalledWith(
        apiFeature._id
      );
    });

    it("should update the feature returned by the service through the feature updater", async () => {
      mockFeatureService.getFeature.mockReturnValue(
        of({ _id: "xxx", name: undefined })
      );
      await service.loadFeature("xxx");
      const updateFeatureData: FeatureUpdateData = {
        name: ""
      };
      expect(mockFeatureUpdater.updateData).toHaveBeenCalledWith(
        updateFeatureData
      );
    });

    it("should throw an error when the feature does not exist", async () => {
      mockFeatureService.getFeature.mockReturnValue(of(null));
      await expect(service.loadFeature()).rejects.toThrow(
        new Error("This feature does not exist")
      );
    });

    it("should request the scenario service", async () => {
      await service.loadFeature();
      expect(mockScenarioService.getCodeblocksFeature).toHaveBeenCalled();
    });

    it("should update the scenario returned by the service through the scenario updater", async () => {
      mockScenarioService.getCodeblocksFeature.mockReturnValue(
        of([apiScenarios[0]])
      );
      await service.loadFeature();
      const expectedUpdate: CodeblockUpdateData = {
        name: apiScenarios[0].name,
        codeBlockId: apiScenarios[0]._id,
        isBackground: apiScenarios[0].isBackground,
        updateType: EventUpdateType.CREATE
      };
      expect(mockScenarioUpdater.updateData).toHaveBeenCalledWith(
        expectedUpdate
      );
    });

    it("should update all scenarios returned by the service through the scenario updater", async () => {
      await service.loadFeature();
      expect(mockScenarioUpdater.updateData).toHaveBeenCalledTimes(2);
    });

    it("should update all section for each returned scenario returned by the service", async () => {
      await service.loadFeature();
      expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith({
        name: "Given",
        codeBlockId: apiScenarios[0]._id,
        steps: apiScenarios[0].givenSteps
      });
      expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith({
        name: "When",
        codeBlockId: apiScenarios[0]._id,
        steps: apiScenarios[0].whenSteps
      });
      expect(mockSectionUpdater.updateSection).toHaveBeenCalledWith({
        name: "Then",
        codeBlockId: apiScenarios[0]._id,
        steps: apiScenarios[0].thenSteps
      });
    });

    it("should not update empty section for scenarios returned by the service", async () => {
      await service.loadFeature();
      expect(mockSectionUpdater.updateSection).toHaveBeenCalledTimes(3);
    });
  });
});
