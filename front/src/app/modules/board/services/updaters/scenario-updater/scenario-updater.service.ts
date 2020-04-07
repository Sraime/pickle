import { Injectable } from '@angular/core';
import { ScenarioUpdateData } from '../../../interfaces/scenario-update-data.interface';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';
import { Observable } from 'rxjs';
import { Updater } from '../updater.interface';
import { AbstractUpdaterService } from '../abstract-updater.service';

@Injectable({
	providedIn: 'root'
})
export class ScenarioUpdaterService extends AbstractUpdaterService<ScenarioUpdateData> {
	constructor(private _boardSynchroService: BoardSocketSynchro) {
		super();
		this._boardSynchroService.getScenarioUpdateObservable().subscribe((data) => {
			super.updateData(data);
		});
	}

	updateData(data: ScenarioUpdateData) {
		if (this._boardSynchroService.synchonizationEnabled()) {
			this._boardSynchroService.dispatchScenarioUpdate(data);
		} else {
			super.updateData(data);
		}
	}
}
