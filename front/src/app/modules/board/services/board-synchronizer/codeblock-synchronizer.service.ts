import { Injectable } from "@angular/core";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-updater.service";
import { BoardSynchronizationManager } from "./board-synchrozation-manager";

@Injectable({
  providedIn: "root",
})
export class CodeblockSynchronizerService
  extends SocketEventSynchronizer<CodeblockUpdateData>
  implements UpdatedSynchronizer<CodeblockUpdateData> {
  constructor(private socketManager: BoardSynchronizationManager) {
    super(socketManager, "board-scenario-update");
  }
}
