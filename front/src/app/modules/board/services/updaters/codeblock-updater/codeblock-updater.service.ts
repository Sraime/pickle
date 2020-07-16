import { Injectable } from "@angular/core";
import { CodeblockUpdateData } from "./codeblock-update-data.interface";
import { BoardSocketSynchro } from "../../board-synchronizer/board-socket-synchro.service";
import { Observable, Subject } from "rxjs";
import { Updater } from "../updater.interface";

@Injectable({
  providedIn: "root"
})
export class CodeblockUpdaterService implements Updater<CodeblockUpdateData> {
  private subjectUpdater: Subject<CodeblockUpdateData> = new Subject<
    CodeblockUpdateData
  >();
  constructor(private _boardSynchroService: BoardSocketSynchro) {
    this._boardSynchroService.getCodeblockUpdateObservable().subscribe(data => {
      this.subjectUpdater.next(data);
    });
  }

  getObservable(): Observable<CodeblockUpdateData> {
    return this.subjectUpdater;
  }

  updateData(data: CodeblockUpdateData) {
    if (this._boardSynchroService.synchonizationEnabled()) {
      this._boardSynchroService.dispatchCodeblockUpdate(data);
    } else {
      this.subjectUpdater.next(data);
    }
  }
}
