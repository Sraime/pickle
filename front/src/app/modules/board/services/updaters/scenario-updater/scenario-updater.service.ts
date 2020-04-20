import { Injectable } from '@angular/core';
import { ScenarioUpdateData } from '../../../interfaces/scenario-update-data.interface';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';
import { Observable, Subject } from 'rxjs';
import { Updater } from '../updater.interface';

@Injectable({
	providedIn: 'root'
})
export class ScenarioUpdaterService implements Updater<ScenarioUpdateData> {
	private subjectUpdater: Subject<ScenarioUpdateData> = new Subject<ScenarioUpdateData>();
	constructor(private _boardSynchroService: BoardSocketSynchro) {
		this._boardSynchroService.getScenarioUpdateObservable().subscribe((data) => {
			this.subjectUpdater.next(data);
		});
	}

	getObservable(): Observable<ScenarioUpdateData> {
		return this.subjectUpdater;
	}

	updateData(data: ScenarioUpdateData) {
		if (this._boardSynchroService.synchonizationEnabled()) {
			this._boardSynchroService.dispatchScenarioUpdate(data);
		} else {
			this.subjectUpdater.next(data);
		}
	}
}
