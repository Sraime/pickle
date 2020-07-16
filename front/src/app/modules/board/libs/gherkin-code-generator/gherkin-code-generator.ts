import { Scenario } from "../../services/feature-assembly/models/scenario/scenario.class";
import { Feature } from "../../services/feature-assembly/models/feature.interface";
import { Step } from "../../services/feature-assembly/models/step.interface";
import { Background } from "../../services/feature-assembly/models/background/background.class";

export class GherkinCodeGenerator {
  static generateFeatureCode(feature: Feature): string {
    if (!feature) {
      return "";
    }
    let code = "Feature: " + feature.name;
    if (
      feature.background &&
      feature.background.getSectionSteps("Given").length > 0
    ) {
      code += GherkinCodeGenerator.generateBackgroundCode(
        feature.background,
        2
      );
    }
    if (feature.scenarios) {
      feature.scenarios.forEach(s => {
        code += GherkinCodeGenerator.generateScenarioCode(s, 2);
      });
    }
    return code;
  }

  static generateScenarioCode(scenairo: Scenario, spacing: number = 0): string {
    let spaces = "";
    for (let i = 0; i < spacing; i++) {
      spaces += " ";
    }
    let code = "\n\n" + spaces + "Scenario: ";
    if (!scenairo) {
      return code;
    }
    code += scenairo.name;
    code += GherkinCodeGenerator.generateSectionCode(
      "Given",
      scenairo.getSectionSteps("Given"),
      spacing + 2
    );
    code += GherkinCodeGenerator.generateSectionCode(
      "When",
      scenairo.getSectionSteps("When"),
      spacing + 2
    );
    code += GherkinCodeGenerator.generateSectionCode(
      "Then",
      scenairo.getSectionSteps("Then"),
      spacing + 2
    );
    return code;
  }

  static generateBackgroundCode(
    background: Background,
    spacing: number = 0
  ): string {
    let spaces = "";
    for (let i = 0; i < spacing; i++) {
      spaces += " ";
    }
    let code = "\n\n" + spaces + "Background: ";
    if (!background) {
      return code;
    }
    code += GherkinCodeGenerator.generateSectionCode(
      "Given",
      background.getSectionSteps("Given"),
      spacing + 2
    );
    return code;
  }

  static generateSectionCode(
    sectionName: string,
    section: Step[],
    spacing: number = 0
  ): string {
    let code = "";
    let spaces = "";
    for (let i = 0; i < spacing; i++) {
      spaces += " ";
    }
    if (section) {
      section.forEach((step, index) => {
        code += "\n" + spaces;
        if (index === 0) {
          code += sectionName + " " + (step ? step.name : "");
        } else {
          code += "And" + " " + (step ? step.name : "");
        }
      });
    }
    return code;
  }
}
