import { Injectable } from '@angular/core';
import { SectionUpdateData } from '../../interfaces/section-update.interface';
import { BoardSynchronizer } from './board-synchronizer';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';

@Injectable({
	providedIn: 'root'
})
export class BoardSocketSynchro implements BoardSynchronizer {
	private _socket = null;

	private _socketUrl: string = environment.socket.board.url;

	private _sectionUpdateSubject: Subject<SectionUpdateData> = new Subject<SectionUpdateData>();
	private _scenarioUpdateSubject: Subject<ScenarioUpdateData> = new Subject<ScenarioUpdateData>();

	constructor() {
		this._socket = io(this._socketUrl, {
			autoConnect: false
		});
		this._socket.on('section-update', (data: SectionUpdateData) => {
			this._sectionUpdateSubject.next(data);
		});
		this._socket.on('scenario-update', (data: ScenarioUpdateData) => {
			this._scenarioUpdateSubject.next(data);
		});
	}

	dispatchScenarioUpdate(scenarioData: ScenarioUpdateData) {
		if (!this.synchonizationEnabled()) {
			throw new Error('Synchronization is not active');
		}
		this._socket.emit('scenario-update', scenarioData);
	}

	getScenarioUpdateObservable(): Observable<ScenarioUpdateData> {
		return this._scenarioUpdateSubject;
	}

	synchonizationEnabled(): boolean {
		return this._socket.connected;
	}

	startSynchronization() {
		this._socket.open();
	}
	stopSynchronization() {
		this._socket.close();
	}
	getSectionUpdateObservable(): Observable<SectionUpdateData> {
		return this._sectionUpdateSubject;
	}

	dispatchSectionUpdate(sectionData: SectionUpdateData) {
		if (!this.synchonizationEnabled()) {
			throw new Error('Synchronization is not active');
		}
		this._socket.emit('section-update', sectionData);
	}
}
