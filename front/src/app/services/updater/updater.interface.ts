import { Observable } from "rxjs";

export interface UpdateDataObject {}

export interface Updater<T extends UpdateDataObject> {
  getObservable(): Observable<T>;
  updateData(data: T);
}
