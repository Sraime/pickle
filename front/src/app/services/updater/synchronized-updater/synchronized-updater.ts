import { Observable, Subject } from "rxjs";
import { UpdateDataObject, Updater } from "../updater.interface";

export interface UpdatedSynchronizer<T extends UpdateDataObject> {
  addCallback(callback: (T) => void);
  synchonizationEnabled(): boolean;
  pushData(data: T);
}

export abstract class SynchronizedUpdater<T> implements Updater<T> {
  private subjectUpdater: Subject<T> = new Subject<T>();

  constructor(private _synchronizer: UpdatedSynchronizer<T>) {
    this._synchronizer.addCallback((data) => {
      this.subjectUpdater.next(data);
    });
  }

  getObservable(): Observable<T> {
    return this.subjectUpdater;
  }
  updateData(data: T) {
    if (this._synchronizer.synchonizationEnabled()) {
      this._synchronizer.pushData(data);
    } else {
      this.subjectUpdater.next(data);
    }
  }
}
