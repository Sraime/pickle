import { Step } from "./step.interface";

export interface SectionUpdateData {
  name: string;
  steps: Array<Step>;
  codeBlockId: string;
}
