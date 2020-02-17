import { CodeBlock } from './block-code.interface';
import { EventUpdateType } from '../libs/EventUpdateType.enums';

export interface ScenarioUpdateData {
	name: string;
	codeBlockId: string;
	updateType: EventUpdateType;
}
