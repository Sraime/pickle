import { Step } from '../../interfaces/step.interface';

export interface ApiScenario {
  _id: string;
  name: string;
  givenSteps: Step[]
  whenSteps: Step[]
  thenSteps: Step[]
}