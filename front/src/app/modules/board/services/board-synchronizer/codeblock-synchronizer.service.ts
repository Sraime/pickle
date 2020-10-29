import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { SocketManagerService } from "src/app/services/synchronizer/socket-manager/socket-manager.service";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-updater.service";

@Injectable({
  providedIn: "root",
})
export class CodeblockSynchronizerService
  extends SocketEventSynchronizer<CodeblockUpdateData>
  implements UpdatedSynchronizer<CodeblockUpdateData> {
  constructor(private socketManager: SocketManagerService) {
    super(socketManager, "scenario-update");
  }
}
