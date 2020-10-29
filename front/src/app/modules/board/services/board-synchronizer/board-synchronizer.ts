import { SectionUpdateData } from "../updaters/section-updater/section-updater.service";
import { Observable } from "rxjs";
import { CodeblockUpdateData } from "../updaters/codeblock-updater/codeblock-updater.service";

export interface BoardSynchronizer {
  startSynchronization(featureId: string);
  stopSynchronization();
  synchonizationEnabled(): boolean;
  dispatchSectionUpdate(sectionData: SectionUpdateData);
  getSectionUpdateObservable(): Observable<SectionUpdateData>;
  dispatchCodeblockUpdate(sectionData: CodeblockUpdateData);
  getCodeblockUpdateObservable(): Observable<CodeblockUpdateData>;
}
