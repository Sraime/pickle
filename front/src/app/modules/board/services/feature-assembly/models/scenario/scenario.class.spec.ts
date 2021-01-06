import { Step } from "../../../updaters/section-updater/section-updater.service";
import { Scenario } from "./scenario.class";

describe("Scenario", () => {
  let instance: Scenario;
  beforeEach(() => {
    instance = new Scenario("S1");
  });

  it("should initialize the name with the contructor argument", () => {
    expect(instance.name).toEqual("S1");
  });

  describe("getAutorizedSectionNames", () => {
    it("should return Given,When,Then as authorized section names", () => {
      expect(instance.getAutorizedSectionNames()).toEqual([
        "Given",
        "When",
        "Then",
      ]);
    });
  });

  describe("Setting & Getting section data", () => {
    it("should have the Given secion as an empty list by default", () => {
      expect(instance.getSectionSteps("Given")).toEqual([]);
    });

    it("should set the Given section and return it updated", () => {
      const simpleSteps: Array<Step> = [{ name: "step1" }];
      instance.setSectionSteps("Given", simpleSteps);
      expect(instance.getSectionSteps("Given")).toEqual(simpleSteps);
    });

    it("should throw an error when the section to set is not Given", () => {
      expect(() => {
        instance.setSectionSteps("INCORRECT_SECTION", []);
      }).toThrowError();
    });

    it("should throw an error when the section to get is not Given", () => {
      expect(() => {
        instance.getSectionSteps("INCORRECT_SECTION");
      }).toThrowError();
    });
  });
});
