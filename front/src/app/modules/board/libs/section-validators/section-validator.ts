import { Step } from "../../services/updaters/section-updater/section-updater.service";

export interface SectionValidator {
  validate(steps: Step[]): boolean;
}
