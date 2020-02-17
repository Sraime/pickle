import { Scenario } from './scenario.interface';

export interface Feature {
	name: string;
	scenarios: Scenario[];
}
