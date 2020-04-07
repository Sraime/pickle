import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Updater } from './updater.interface';

@Injectable()
export abstract class AbstractUpdaterService<UpdateDataObject>
	implements Updater<UpdateDataObject> {
	private subjectUpdater: Subject<UpdateDataObject> = new Subject<UpdateDataObject>();

	constructor() {}

	getObservable(): Observable<UpdateDataObject> {
		return this.subjectUpdater;
	}

	updateData(data: UpdateDataObject) {
		this.subjectUpdater.next(data);
	}
}
