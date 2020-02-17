import { Section } from './section.interface';
import { Step } from './step.interface';

export interface Scenario {
	name: string;
	givenSteps: Step[];
	whenSteps: Step[];
	thenSteps: Step[];
}
