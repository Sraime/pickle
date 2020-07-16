import { GherkinCodeGenerator } from "./gherkin-code-generator";
import { Feature } from "../../services/feature-assembly/models/feature.interface";
import { Background } from "../../services/feature-assembly/models/background/background.class";
import { Scenario } from "../../services/feature-assembly/models/scenario/scenario.class";
import { Step } from "../../services/feature-assembly/models/step.interface";

jest.mock("../../services/feature-assembly/models/feature.interface");
jest.mock("../../services/feature-assembly/models/background/background.class");
jest.mock("../../services/feature-assembly/models/scenario/scenario.class");
jest.mock("../../services/feature-assembly/models/step.interface");

describe("GerkinCodeGenerator", () => {
  let mockedFeature: jest.Mocked<Feature>;
  describe("generateFeatureCode()", () => {
    it("should return Feature code with the name when scenarios is empty", () => {
      mockedFeature = { name: "simple", background: null, scenarios: [] };
      const code: string = GherkinCodeGenerator.generateFeatureCode(
        mockedFeature
      );
      expect(code).toEqual("Feature: simple");
    });

    it("should return Feature code with the name when scenarios is null", () => {
      mockedFeature = { name: "simple", background: null, scenarios: null };
      const code: string = GherkinCodeGenerator.generateFeatureCode(
        mockedFeature
      );
      expect(code).toEqual("Feature: simple");
    });

    it("should return an empty string when the feature is null", () => {
      const code: string = GherkinCodeGenerator.generateFeatureCode(null);
      expect(code).toEqual("");
    });
  });
  describe("generateScenarioCode", () => {
    let mockedScenario: jest.Mocked<Scenario>;
    it("should return only the label when when scenario is null", () => {
      mockedScenario = null;

      const code: string = GherkinCodeGenerator.generateScenarioCode(
        mockedScenario
      );
      expect(code).toEqual(`

Scenario: `);
    });

    it("should return a scenario with a name when sections are empty", () => {
      mockedScenario = new (Scenario as any)();
      mockedScenario.name = "s1";
      mockedScenario.getSectionSteps = jest.fn();
      mockedScenario.getSectionSteps.mockReturnValue([]);

      const code: string = GherkinCodeGenerator.generateScenarioCode(
        mockedScenario
      );
      expect(code).toEqual(`

Scenario: s1`);
    });

    it("should return a scenario with a name when sections are null", () => {
      mockedScenario = new (Scenario as any)();
      mockedScenario.name = "s1";
      mockedScenario.getSectionSteps = jest.fn();
      mockedScenario.getSectionSteps.mockReturnValue(null);

      const code: string = GherkinCodeGenerator.generateScenarioCode(
        mockedScenario
      );
      expect(code).toEqual(`

Scenario: s1`);
    });

    it("should add spacing before then scenario", () => {
      mockedScenario = new (Scenario as any)();
      mockedScenario.name = "s1";

      const code: string = GherkinCodeGenerator.generateScenarioCode(
        mockedScenario,
        2
      );
      expect(code).toEqual(`

  Scenario: s1`);
    });
  });

  describe("generateBackgroundCode", () => {
    let mockedBackground: jest.Mocked<Background>;
    it("should return only the label when Background is null", () => {
      const code: string = GherkinCodeGenerator.generateBackgroundCode(null);
      expect(code).toEqual(`

Background: `);
    });

    it("should return the Background label with a name when sections are empty", () => {
      mockedBackground = new (Background as any)();
      mockedBackground.getSectionSteps = jest.fn();
      mockedBackground.getSectionSteps.mockReturnValue([]);

      const code: string = GherkinCodeGenerator.generateBackgroundCode(
        mockedBackground
      );
      expect(code).toEqual(`

Background: `);
    });

    it("should return the Background label with a name when sections are null", () => {
      mockedBackground = new (Background as any)();
      mockedBackground.getSectionSteps = jest.fn();
      mockedBackground.getSectionSteps.mockReturnValue(null);

      const code: string = GherkinCodeGenerator.generateBackgroundCode(
        mockedBackground
      );
      expect(code).toEqual(`

Background: `);
    });

    it("should add spacing before the background", () => {
      mockedBackground = new (Background as any)();

      const code: string = GherkinCodeGenerator.generateBackgroundCode(
        mockedBackground,
        2
      );
      expect(code).toEqual(`

  Background: `);
    });
  });

  describe("generateSectionCode", () => {
    it("should return an empty string when it is null", () => {
      const code = GherkinCodeGenerator.generateSectionCode("Given", null);
      expect(code).toEqual("");
    });

    it("should return an empty string when it is empty", () => {
      const code = GherkinCodeGenerator.generateSectionCode("Given", []);
      expect(code).toEqual("");
    });

    it("should a on line step liste with the give section name", () => {
      const section: Step[] = [{ name: "step1" }];
      const code = GherkinCodeGenerator.generateSectionCode("Given", section);
      expect(code).toEqual(`
Given step1`);
    });

    it("should add an string step when the step is null", () => {
      const section: Step[] = [null];
      const code = GherkinCodeGenerator.generateSectionCode("Given", section);
      expect(code).toEqual(`
Given `);
    });

    it("should use the And keywork for the step the second step", () => {
      const section: Step[] = [{ name: "step1" }, { name: "step2" }];
      const code = GherkinCodeGenerator.generateSectionCode("Given", section);
      expect(code).toEqual(`
Given step1
And step2`);
    });

    it("should add spacing before each step", () => {
      const section: Step[] = [{ name: "step1" }, { name: "step2" }];
      const code = GherkinCodeGenerator.generateSectionCode(
        "Given",
        section,
        2
      );
      expect(code).toEqual(`
  Given step1
  And step2`);
    });
  });
});
