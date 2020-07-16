import { Codeblock } from "../codeblock.interface";
import { Step } from "../step.interface";

export class Background implements Codeblock {
  public static readonly AUTORIZED_SECTIONS = ["Given"];
  private givenSteps: Step[] = [];

  getAutorizedSectionNames(): string[] {
    return Background.AUTORIZED_SECTIONS;
  }

  getSectionSteps(sectionName: string): Step[] {
    if (Background.AUTORIZED_SECTIONS.includes(sectionName)) {
      return this.givenSteps;
    }
    throw new Error("unautorised section name");
  }
  setSectionSteps(sectionName: string, steps: Step[]): void {
    if (Background.AUTORIZED_SECTIONS.includes(sectionName)) {
      this.givenSteps = steps;
    } else {
      throw new Error("unautorized section name");
    }
  }
}
