import { Step } from "../../services/updaters/section-updater/step.interface";

export interface SectionValidator {
  validate(steps: Step[]): boolean;
}
