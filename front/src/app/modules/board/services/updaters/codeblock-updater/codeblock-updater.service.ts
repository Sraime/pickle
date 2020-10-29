import { Injectable } from "@angular/core";
import { SynchronizedUpdater } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { UpdateDataObject } from "src/app/services/updater/updater.interface";
import { CodeblockSynchronizerService } from "../../board-synchronizer/codeblock-synchronizer.service";

export enum EventUpdateType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface CodeblockUpdateData extends UpdateDataObject {
  name: string;
  codeBlockId: string;
  isBackground: boolean;
  updateType: EventUpdateType;
}

@Injectable({
  providedIn: "root",
})
export class CodeblockUpdaterService extends SynchronizedUpdater<
  CodeblockUpdateData
> {
  constructor(
    private _codeblockSynchronizerService: CodeblockSynchronizerService
  ) {
    super(_codeblockSynchronizerService);
  }
}
