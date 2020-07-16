import { Background } from "./background.class";
import { Step } from "../../../updaters/section-updater/step.interface";

describe("Background", () => {
  let instance: Background;
  beforeEach(() => {
    instance = new Background();
  });

  describe("getAutorizedSectionNames", () => {
    it("should return Given as authorized section name", () => {
      expect(instance.getAutorizedSectionNames()).toEqual(["Given"]);
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
