import { Injectable } from '@angular/core';
import { FeatureUpdateData } from '../../../interfaces/feature-update-data.interface';
import { AbstractUpdaterService } from '../abstract-updater.service';

@Injectable({
	providedIn: 'root'
})
export class FeatureUpdaterService extends AbstractUpdaterService<FeatureUpdateData> {}
