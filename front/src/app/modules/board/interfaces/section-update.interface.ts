import { Step } from './step.interface';
import { EventUpdateType } from '../libs/EventUpdateType.enums';

export interface SectionUpdateData {
	name: string;
	steps: Step[];
	codeBlockId: string;
}
