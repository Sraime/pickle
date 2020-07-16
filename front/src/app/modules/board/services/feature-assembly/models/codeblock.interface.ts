import { Step } from './step.interface';

export interface Codeblock {
  getAutorizedSectionNames(): string[];
  getSectionSteps(sectionName: string): Step[];
  setSectionSteps(sectionName: string, steps: Step[]): void;
}