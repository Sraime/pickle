import { Injectable } from "@angular/core";
import { SectionUpdateData } from "../updaters/section-updater/section-update.interface";
import { BoardSynchronizer } from "./board-synchronizer";
import io from "socket.io-client";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-update-data.interface";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-update-data.interface";

@Injectable({
  providedIn: "root"
})
export class BoardSocketSynchro implements BoardSynchronizer {
  private _socket = null;

  private _socketUrl: string = environment.socket.board.url;

  private _sectionUpdateSubject: Subject<SectionUpdateData> = new Subject<
    SectionUpdateData
  >();
  private _scenarioUpdateSubject: Subject<CodeblockUpdateData> = new Subject<
    CodeblockUpdateData
  >();
  private _featureUpdateSubject: Subject<FeatureUpdateData> = new Subject<
    FeatureUpdateData
  >();

  constructor() {}

  dispatchCodeblockUpdate(scenarioData: CodeblockUpdateData) {
    if (!this.synchonizationEnabled()) {
      throw new Error("Synchronization is not active");
    }
    this._socket.emit("scenario-update", scenarioData);
  }

  getCodeblockUpdateObservable(): Observable<CodeblockUpdateData> {
    return this._scenarioUpdateSubject;
  }

  synchonizationEnabled(): boolean {
    return this._socket && this._socket.connected;
  }

  startSynchronization(featureId: string) {
    this._socket = io(this._socketUrl, {
      query: { featureId }
    });
    this._socket.on("section-update", (data: SectionUpdateData) => {
      this._sectionUpdateSubject.next(data);
    });
    this._socket.on("scenario-update", (data: CodeblockUpdateData) => {
      this._scenarioUpdateSubject.next(data);
    });
    this._socket.on("feature-update", (data: FeatureUpdateData) => {
      this._featureUpdateSubject.next(data);
    });
  }
  stopSynchronization() {
    if (this._socket) {
      this._socket.close();
    }
  }
  getSectionUpdateObservable(): Observable<SectionUpdateData> {
    return this._sectionUpdateSubject;
  }

  dispatchSectionUpdate(sectionData: SectionUpdateData) {
    if (!this.synchonizationEnabled()) {
      throw new Error("Synchronization is not active");
    }
    this._socket.emit("section-update", sectionData);
  }

  getFeatureUpdateObservable(): Observable<FeatureUpdateData> {
    return this._featureUpdateSubject;
  }

  dispatchFeatureUpdate(featureData: FeatureUpdateData) {
    if (!this.synchonizationEnabled()) {
      throw new Error("Synchronization is not active");
    }
    this._socket.emit("feature-update", featureData);
  }
}
