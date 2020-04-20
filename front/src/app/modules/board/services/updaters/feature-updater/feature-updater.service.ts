import { Injectable } from '@angular/core';
import { FeatureUpdateData } from '../../../interfaces/feature-update-data.interface';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';
import { Updater } from '../updater.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FeatureUpdaterService implements Updater<FeatureUpdateData> {
	private subjectUpdater: Subject<FeatureUpdateData> = new Subject<FeatureUpdateData>();
	constructor(private _boardSynchroService: BoardSocketSynchro) {
		this._boardSynchroService.getFeatureUpdateObservable().subscribe((data) => {
			this.subjectUpdater.next(data);
		});
	}

	getObservable(): Observable<FeatureUpdateData> {
		return this.subjectUpdater;
	}

	updateData(data: FeatureUpdateData) {
		if (this._boardSynchroService.synchonizationEnabled()) {
			this._boardSynchroService.dispatchFeatureUpdate(data);
		} else {
			this.subjectUpdater.next(data);
		}
	}
}
