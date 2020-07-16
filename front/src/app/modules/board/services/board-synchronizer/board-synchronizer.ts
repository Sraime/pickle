import { SectionUpdateData } from "../updaters/section-updater/section-update.interface";
import { Observable } from "rxjs";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-update-data.interface";

export interface BoardSynchronizer {
  startSynchronization(featureId: string);
  stopSynchronization();
  synchonizationEnabled(): boolean;
  dispatchSectionUpdate(sectionData: SectionUpdateData);
  getSectionUpdateObservable(): Observable<SectionUpdateData>;
  dispatchCodeblockUpdate(sectionData: CodeblockUpdateData);
  getCodeblockUpdateObservable(): Observable<CodeblockUpdateData>;
}
