import { TestBed } from "@angular/core/testing";

import { BoardSocketSynchro } from "./board-socket-synchro.service";
import { SectionUpdateData } from "../updaters/section-updater/section-updater.service";

jest.mock("socket.io-client");

import io from "socket.io-client";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../updaters/codeblock-updater/codeblock-updater.service";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-updater.service";

describe("SynchroBoardService", () => {
  let service: BoardSocketSynchro;
  const listennedEvents = new Map<string, any>();
  const MockSocket = {
    emit: jest.fn(),
    close: jest.fn(),
    open: jest.fn(),
    connected: false,
    on: (event, callback) => {
      listennedEvents.set(event, callback);
    },
  };
  const sectionUpdate: SectionUpdateData = {
    steps: [],
    name: "Given",
    codeBlockId: "xx",
  };

  const scenarioUpdateTypeCreate: CodeblockUpdateData = {
    name: "sc1",
    codeBlockId: "xxx",
    isBackground: false,
    updateType: EventUpdateType.CREATE,
  };

  const featureUpdate: FeatureUpdateData = {
    name: "sc1",
  };

  io.mockImplementation(() => {
    MockSocket.connected = true;
    return MockSocket;
  });
  MockSocket.close.mockImplementation(() => {
    MockSocket.connected = false;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardSocketSynchro);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should have synchronization disabled by default", () => {
    expect(service.synchonizationEnabled()).toBeFalsy();
  });

  it("should enable synchronization", () => {
    service.startSynchronization("xxx");
    expect(io).toHaveBeenCalled();
    expect(service.synchonizationEnabled()).toBeTruthy();
  });

  it("should disable synchronization", () => {
    service.startSynchronization("xxx");
    service.stopSynchronization();
    expect(service.synchonizationEnabled()).toBeFalsy();
    expect(MockSocket.close).toHaveBeenCalled();
  });

  describe("init listen events", () => {
    it("should listend section-update events", () => {
      expect(listennedEvents.get("section-update")).toBeTruthy();
    });

    it("should listend scenario-update events", () => {
      expect(listennedEvents.get("scenario-update")).toBeTruthy();
    });
  });

  describe("dispatch actions", () => {
    describe("synchro disabled", () => {
      it("should throw an error when trying a dispatch section update", () => {
        expect(() => {
          service.dispatchSectionUpdate(sectionUpdate);
        }).toThrowError("Synchronization is not active");
      });

      it("should throw an error when trying a dispatch scenario update", () => {
        expect(() => {
          service.dispatchCodeblockUpdate(scenarioUpdateTypeCreate);
        }).toThrowError("Synchronization is not active");
      });

      it("should throw an error when trying a dispatch feature update", () => {
        expect(() => {
          service.dispatchFeatureUpdate(scenarioUpdateTypeCreate);
        }).toThrowError("Synchronization is not active");
      });
    });

    describe("synchro enabled", () => {
      beforeEach(() => {
        service.startSynchronization("xxx");
      });
      afterEach(() => {
        service.stopSynchronization();
      });

      it("should emit updated data when trying a dispatch section update", () => {
        service.dispatchSectionUpdate(sectionUpdate);
        expect(MockSocket.emit).toHaveBeenCalledWith(
          "section-update",
          sectionUpdate
        );
      });

      it("should emit updated data when trying a dispatch scenario update", () => {
        service.dispatchCodeblockUpdate(scenarioUpdateTypeCreate);
        expect(MockSocket.emit).toHaveBeenCalledWith(
          "scenario-update",
          scenarioUpdateTypeCreate
        );
      });

      it("should emit updated data when trying a dispatch feature update", () => {
        service.dispatchFeatureUpdate(featureUpdate);
        expect(MockSocket.emit).toHaveBeenCalledWith(
          "feature-update",
          featureUpdate
        );
      });

      it("should receive updated data on section-update event", (done) => {
        service.getSectionUpdateObservable().subscribe((data) => {
          expect(data).toEqual(sectionUpdate);
          done();
        });
        listennedEvents.get("section-update")(sectionUpdate);
      });

      it("should receive updated data on scenario-update event", (done) => {
        service.getCodeblockUpdateObservable().subscribe((data) => {
          expect(data).toEqual(scenarioUpdateTypeCreate);
          done();
        });
        listennedEvents.get("scenario-update")(scenarioUpdateTypeCreate);
      });

      it("should receive updated data on feature-update event", (done) => {
        service.getFeatureUpdateObservable().subscribe((data) => {
          expect(data).toEqual(featureUpdate);
          done();
        });
        listennedEvents.get("feature-update")(featureUpdate);
      });
    });
  });
});
