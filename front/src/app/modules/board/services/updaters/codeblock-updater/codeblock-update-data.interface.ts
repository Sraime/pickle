import { EventUpdateType } from "./EventUpdateType.enums";

export interface CodeblockUpdateData {
  name: string;
  codeBlockId: string;
  isBackground: boolean;
  updateType: EventUpdateType;
}
