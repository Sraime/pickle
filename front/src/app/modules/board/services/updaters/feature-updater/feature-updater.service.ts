import { Injectable } from "@angular/core";
import { SynchronizedUpdater } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { UpdateDataObject } from "src/app/services/updater/updater.interface";
import { FeatureSynchronizerService } from "../../board-synchronizer/feature-synchronizer.service";

export interface FeatureUpdateData extends UpdateDataObject {
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class FeatureUpdaterService extends SynchronizedUpdater<
  FeatureUpdateData
> {
  constructor(private _featureSynchronizer: FeatureSynchronizerService) {
    super(_featureSynchronizer);
  }
}
