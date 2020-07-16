import { SectionValidator } from "../section-validator";
import { Step } from "../../../services/updaters/section-updater/step.interface";
export class NotEmptySectionValidator implements SectionValidator {
  validate(steps: Step[]): boolean {
    return steps.length > 0;
  }
}
