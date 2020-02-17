import { Step } from '../../interfaces/step.interface';
export interface SectionValidator {
	validate(steps: Step[]): boolean;
}
