import { Step } from '../../interfaces/step';
export interface SectionValidator {
    validate(steps: Step[]): boolean;
}