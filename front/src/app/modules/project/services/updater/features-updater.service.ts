import { Injectable } from "@angular/core";
import { SynchronizedUpdater } from "src/app/services/updater/synchronized-updater/synchronized-updater";
import { UpdateDataObject } from "src/app/services/updater/updater.interface";
import { FeaturesSynchronizerService } from "../synchronizer/features-synchronizer.service";

export interface FeatureListData extends UpdateDataObject {}

@Injectable({
  providedIn: "root",
})
export class FeaturesUpdaterService extends SynchronizedUpdater<
  FeatureListData
> {
  constructor(private _featuresSynchronizer: FeaturesSynchronizerService) {
    super(_featuresSynchronizer);
  }
}
