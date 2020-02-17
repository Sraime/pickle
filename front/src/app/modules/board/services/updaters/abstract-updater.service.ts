import { Observable, Subject } from 'rxjs';

export abstract class AbstractUpdaterService<UpdateDataObject> {
	private subjectUpdater: Subject<UpdateDataObject> = new Subject<UpdateDataObject>();

	constructor() {}

	getObservable(): Observable<UpdateDataObject> {
		return this.subjectUpdater;
	}

	updateData(data: UpdateDataObject) {
		this.subjectUpdater.next(data);
	}
}
