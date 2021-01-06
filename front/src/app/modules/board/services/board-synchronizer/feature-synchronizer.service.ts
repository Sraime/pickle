import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-updater.service";
import { BoardSynchronizationManager } from "./board-synchrozation-manager";

@Injectable({
  providedIn: "root",
})
export class FeatureSynchronizerService
  extends SocketEventSynchronizer<FeatureUpdateData>
  implements UpdatedSynchronizer<FeatureUpdateData> {
  constructor(private socketManager: BoardSynchronizationManager) {
    super(socketManager, "board-feature-update");
  }
}
