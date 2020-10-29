import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocketEventSynchronizer } from "src/app/services/synchronizer/socket-event-synchronizer";
import { SocketManagerService } from "src/app/services/synchronizer/socket-manager/socket-manager.service";
import { UpdatedSynchronizer } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { SectionUpdateData } from "../updaters/section-updater/section-updater.service";

@Injectable({
  providedIn: "root",
})
export class SectionSynchronizerService
  extends SocketEventSynchronizer<SectionUpdateData>
  implements UpdatedSynchronizer<SectionUpdateData> {
  constructor(private socketManager: SocketManagerService) {
    super(socketManager, "section-update");
  }
}
