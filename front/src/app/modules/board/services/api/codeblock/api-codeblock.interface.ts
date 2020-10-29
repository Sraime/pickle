import { Step } from "../../updaters/section-updater/section-updater.service";

export interface ApiCodeblock {
  _id: string;
  name: string;
  isBackground: boolean;
  givenSteps: Step[];
  whenSteps: Step[];
  thenSteps: Step[];
}
