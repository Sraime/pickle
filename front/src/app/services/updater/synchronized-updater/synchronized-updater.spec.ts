import {
  SynchronizedUpdater,
  UpdatedSynchronizer,
} from "./synchronized-updater";
import { UpdateDataObject } from "../updater.interface";
import { Observable, Subject } from "rxjs";

interface SimpleData extends UpdateDataObject {}
const synchronerObservable: Subject<SimpleData> = new Subject<SimpleData>();
const mockedSynchronizer: jest.Mocked<UpdatedSynchronizer<SimpleData>> = {
  getUpdateObservable: jest.fn().mockReturnValue(synchronerObservable),
  synchonizationEnabled: jest.fn(),
  dispatchUpdate: jest.fn(),
};

class SimpleSynchronizedUpdater extends SynchronizedUpdater<SimpleData> {}

describe("SynchronizedUpdater", () => {
  let udpater: SimpleSynchronizedUpdater;

  beforeEach(() => {
    udpater = new SimpleSynchronizedUpdater(mockedSynchronizer);
  });

  it("should be created", () => {
    expect(udpater).toBeTruthy();
  });

  it("should dispatch the event when the synchro service dispatch one", (done) => {
    const dispatchedData: SimpleData = {};
    udpater.getObservable().subscribe((data) => {
      expect(data).toEqual(dispatchedData);
      done();
    });
    synchronerObservable.next(dispatchedData);
  });

  describe("synchro enabled", () => {
    const dataToDispatch: SimpleData = {};

    it("should dispatch to the synchroniser when it is enabled", () => {
      mockedSynchronizer.synchonizationEnabled.mockReturnValue(true);
      udpater.updateData(dataToDispatch);
      expect(mockedSynchronizer.dispatchUpdate).toHaveBeenCalledWith(
        dataToDispatch
      );
    });

    it("should dispatch localy when the synchronisation is disabled", (done) => {
      mockedSynchronizer.synchonizationEnabled.mockReturnValue(false);
      const dataToDispatch: SimpleData = {};
      udpater.getObservable().subscribe((data) => {
        expect(data).toEqual(dataToDispatch);
        done();
      });
      udpater.updateData(dataToDispatch);
    });
  });
});
