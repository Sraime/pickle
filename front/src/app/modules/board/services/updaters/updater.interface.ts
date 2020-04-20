import { Observable } from 'rxjs';

export interface Updater<UpdateDataObject> {
	getObservable(): Observable<UpdateDataObject>;
	updateData(data: UpdateDataObject);
}
