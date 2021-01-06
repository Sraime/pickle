import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { SectionUpdateData } from "../updaters/section-updater/section-updater.service";
import { BoardSynchronizationManager } from "./board-synchrozation-manager";

@Injectable({
  providedIn: "root",
})
export class SectionSynchronizerService
  extends SocketEventSynchronizer<SectionUpdateData>
  implements UpdatedSynchronizer<SectionUpdateData> {
  constructor(private socketManager: BoardSynchronizationManager) {
    super(socketManager, "board-section-update");
  }
}
