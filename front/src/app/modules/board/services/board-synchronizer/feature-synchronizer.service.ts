import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { SocketManagerService } from "src/app/services/synchronizer/socket-manager/socket-manager.service";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { FeatureUpdateData } from "../updaters/feature-updater/feature-updater.service";

@Injectable({
  providedIn: "root",
})
export class FeatureSynchronizerService
  extends SocketEventSynchronizer<FeatureUpdateData>
  implements UpdatedSynchronizer<FeatureUpdateData> {
  constructor(private socketManager: SocketManagerService) {
    super(socketManager, "feature-update");
  }
}
