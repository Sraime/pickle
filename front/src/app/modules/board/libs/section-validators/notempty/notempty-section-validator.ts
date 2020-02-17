import { SectionValidator } from '../section-validator';
import { Step } from '../../../interfaces/step.interface';
export class NotEmptySectionValidator implements SectionValidator {
	validate(steps: Step[]): boolean {
		return steps.length > 0;
	}
}
