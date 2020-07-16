import { Codeblock } from "../codeblock.interface";
import { Step } from "../step.interface";

export class Scenario implements Codeblock {
  public static readonly AUTORIZED_SECTIONS = ["Given", "When", "Then"];
  private _name: string;
  private sections: Map<string, Step[]> = new Map<string, Step[]>();

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  constructor(name: string) {
    this._name = name;
  }

  getAutorizedSectionNames(): string[] {
    return Scenario.AUTORIZED_SECTIONS;
  }

  getSectionSteps(sectionName: string): Step[] {
    if (Scenario.AUTORIZED_SECTIONS.includes(sectionName)) {
      const storedSteps = this.sections.get(sectionName);
      return storedSteps ? storedSteps : [];
    }
    throw new Error("unautorised section name");
  }
  setSectionSteps(sectionName: string, steps: Step[]): void {
    if (Scenario.AUTORIZED_SECTIONS.includes(sectionName)) {
      this.sections.set(sectionName, steps);
    } else {
      throw new Error("unautorized section name");
    }
  }
}
