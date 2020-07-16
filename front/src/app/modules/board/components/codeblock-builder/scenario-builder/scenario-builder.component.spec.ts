import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScenarioBuilderComponent } from "./scenario-builder.component";
import { configureTestSuite } from "ng-bullet";
import { By } from "@angular/platform-browser";
import { CodeblockUpdaterService } from "../../../services/updaters/codeblock-updater/codeblock-updater.service";
import { EventUpdateType } from "../../../services/updaters/codeblock-updater/EventUpdateType.enums";
import { MockComponent } from "ng-mocks";
import { SectionStepsComponent } from "../../section-steps/section-steps.component";
import { EditTextComponent } from "../../edit-text/edit-text.component";
import { MatIconModule } from "@angular/material/icon";
import { of } from "rxjs";
import { DeleteCodeblockEventData } from "../delete-codeblock-event-data";

describe("ScenarioBuilderComponent", () => {
  let component: ScenarioBuilderComponent;
  let fixture: ComponentFixture<ScenarioBuilderComponent>;
  const stubUpadateData = jest.fn();

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScenarioBuilderComponent,
        MockComponent(SectionStepsComponent),
        MockComponent(EditTextComponent)
      ],
      imports: [MatIconModule],
      providers: [
        {
          provide: CodeblockUpdaterService,
          useValue: {
            getObservable: jest.fn().mockReturnValue(of({})),
            updateData: stubUpadateData
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the label Scenario", () => {
    const labelElement = fixture.debugElement.query(
      By.css(".codeblock-header label")
    );
    expect(labelElement.nativeElement.textContent).toEqual("Scenario: ");
  });

  it("should have the 3 sections Given When Then available ", () => {
    const sectionElements = fixture.debugElement.queryAll(
      By.css("section-steps")
    );
    expect(sectionElements).toHaveLength(3);
  });

  describe("delete scenario", () => {
    let btnDel;

    beforeEach(() => {
      btnDel = fixture.debugElement.query(By.css(".btn-del-codeblock"));
    });

    it("should have a delete button", () => {
      expect(btnDel).toBeTruthy();
    });

    it("should emit an event with the codeBlockId after clicking on the button", done => {
      component.codeBlockId = "codeID";
      component.delEvent.subscribe(codeBlockId => {
        expect(codeBlockId).toEqual(new DeleteCodeblockEventData("codeID"));
        done();
      });
      btnDel.nativeElement.click();
    });
  });

  describe("scenario name", () => {
    let scenarioName;
    const SCENARIO_HEADER_SELECTOR = ".codeblock-header";
    const HEADER_MSG_SELECTOR =
      SCENARIO_HEADER_SELECTOR + " .codeblock-header-msg";
    const NAME_SELECTOR = HEADER_MSG_SELECTOR + " edit-text.codeblock-name";

    beforeEach(() => {
      scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
    });

    it("should have an edit text for the name", () => {
      scenarioName = fixture.debugElement.query(By.css(NAME_SELECTOR));
      expect(scenarioName).toBeTruthy();
    });

    it("should dispatch through the service updater when the name change", () => {
      component.codeBlockId = "S1";
      const editText: EditTextComponent = fixture.debugElement.query(
        By.directive(EditTextComponent)
      ).componentInstance;
      editText.saveEvent.emit("hello");
      expect(stubUpadateData).toHaveBeenCalledWith({
        codeBlockId: "S1",
        name: "hello",
        isBackground: false,
        updateType: EventUpdateType.UPDATE
      });
    });
  });
});
