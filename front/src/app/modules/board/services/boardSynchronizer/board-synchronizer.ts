import { SectionUpdateData } from '../../interfaces/section-update.interface';
import { Observable } from 'rxjs';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';

export interface BoardSynchronizer {
	startSynchronization();
	stopSynchronization();
	synchonizationEnabled(): boolean;
	dispatchSectionUpdate(sectionData: SectionUpdateData);
	getSectionUpdateObservable(): Observable<SectionUpdateData>;
	dispatchScenarioUpdate(sectionData: ScenarioUpdateData);
	getScenarioUpdateObservable(): Observable<ScenarioUpdateData>;
}
