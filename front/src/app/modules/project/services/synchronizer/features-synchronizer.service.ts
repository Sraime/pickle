import { Injectable } from "@angular/core";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { FeatureListData } from "../updater/features-updater.service";
import { ProjectSynchronizationManager } from "./project-synchronization-manager";

@Injectable({
  providedIn: "root",
})
export class FeaturesSynchronizerService
  extends SocketEventSynchronizer<FeatureListData>
  implements UpdatedSynchronizer<FeatureListData> {
  constructor(private socketManager: ProjectSynchronizationManager) {
    super(socketManager, "project-features-update");
  }
}
