import { TestBed } from "@angular/core/testing";

import { CodeblockUpdaterService } from "./codeblock-updater.service";
import { CodeblockUpdateData } from "./codeblock-update-data.interface";
import { EventUpdateType } from "./EventUpdateType.enums";
import { BoardSocketSynchro } from "../../board-synchronizer/board-socket-synchro.service";
import { Subject } from "rxjs";

jest.mock("../../board-synchronizer/board-socket-synchro.service");

describe("ScenarioUpdaterService", () => {
  const mockSocketSynchroService: jest.Mocked<BoardSocketSynchro> = new BoardSocketSynchro() as jest.Mocked<
    BoardSocketSynchro
  >;
  let service: CodeblockUpdaterService;
  const scenarioUpdateTypeCreate: CodeblockUpdateData = {
    name: "test",
    codeBlockId: "xx",
    isBackground: false,
    updateType: EventUpdateType.CREATE
  };
  const subjectSynchroEvent: Subject<CodeblockUpdateData> = new Subject<
    CodeblockUpdateData
  >();

  mockSocketSynchroService.getCodeblockUpdateObservable.mockReturnValue(
    subjectSynchroEvent
  );
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BoardSocketSynchro,
          useValue: mockSocketSynchroService
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(CodeblockUpdaterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should dispatch the event when the synchro service dispatch one", done => {
    service.getObservable().subscribe(data => {
      expect(data).toEqual(scenarioUpdateTypeCreate);
      done();
    });
    subjectSynchroEvent.next(scenarioUpdateTypeCreate);
  });

  describe("synchro enabled", () => {
    beforeAll(() => {
      mockSocketSynchroService.synchonizationEnabled.mockReturnValue(true);
    });

    it("should dispatch to the synchroniser", () => {
      service.updateData(scenarioUpdateTypeCreate);
      expect(
        mockSocketSynchroService.dispatchCodeblockUpdate
      ).toHaveBeenCalledWith(scenarioUpdateTypeCreate);
    });
  });

  describe("synchro enabled", () => {
    beforeAll(() => {
      mockSocketSynchroService.synchonizationEnabled.mockReturnValue(false);
    });

    it("should dispatch localy when the synchronisation is disabled", done => {
      service.getObservable().subscribe(data => {
        expect(data).toEqual(scenarioUpdateTypeCreate);
        done();
      });
      service.updateData(scenarioUpdateTypeCreate);
    });
  });
});
