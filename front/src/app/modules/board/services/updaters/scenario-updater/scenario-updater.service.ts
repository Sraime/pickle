import { Injectable } from '@angular/core';
import { ScenarioUpdateData } from '../../../interfaces/scenario-update-data.interface';
import { AbstractUpdaterService } from '../abstract-updater.service';

@Injectable({
	providedIn: 'root'
})
export class ScenarioUpdaterService extends AbstractUpdaterService<ScenarioUpdateData> {}
