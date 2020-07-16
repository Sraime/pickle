import { Scenario } from "./scenario/scenario.class";
import { Background } from "./background/background.class";

export interface Feature {
  name: string;
  scenarios: Scenario[];
  background: Background;
}
