import { Step } from "../../updaters/section-updater/step.interface";

export interface ApiCodeblock {
  _id: string;
  name: string;
  isBackground: boolean;
  givenSteps: Step[];
  whenSteps: Step[];
  thenSteps: Step[];
}
