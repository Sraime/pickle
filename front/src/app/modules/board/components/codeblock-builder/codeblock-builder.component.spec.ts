import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { configureTestSuite } from "ng-bullet";
import { By } from "@angular/platform-browser";
import { MockComponent } from "ng-mocks";
import { SectionStepsComponent } from "../section-steps/section-steps.component";
import { EditTextComponent } from "../edit-text/edit-text.component";
import { MatIconModule } from "@angular/material/icon";
import { CodeblockBuilderComponent } from "./codeblock-builder.component";
import { DeleteCodeblockEventData } from "./delete-codeblock-event-data";

describe("CodeblockBuilderComponent", () => {
  let component: CodeblockBuilderComponent;
  let fixture: ComponentFixture<CodeblockBuilderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CodeblockBuilderComponent,
        MockComponent(SectionStepsComponent),
        MockComponent(EditTextComponent)
      ],
      imports: [MatIconModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeblockBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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

    it("should not have the delete button when deletion is disabled", async(() => {
      component.deletable = false;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        btnDel = fixture.debugElement.query(By.css(".btn-del-codeblock"));
        expect(btnDel).toBeFalsy();
      });
    }));
  });

  describe("codeblock header", () => {
    const CODEBLOCK_HEADER_SELECTOR = ".codeblock-header";
    const CODEBLOCK_LABEL = CODEBLOCK_HEADER_SELECTOR + " label";
    const HEADER_MSG_SELECTOR =
      CODEBLOCK_HEADER_SELECTOR + " .codeblock-header-msg";
    const NAME_SELECTOR = HEADER_MSG_SELECTOR + " edit-text.codeblock-name";

    it("should have the label displayed", async(() => {
      component.codeblockLabel = "Codeblock";
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const codeblockLabel = fixture.debugElement.query(
          By.css(CODEBLOCK_LABEL)
        );
        expect(codeblockLabel.nativeElement.textContent).toEqual("Codeblock: ");
      });
    }));

    it("should have an edit text for the name", () => {
      const codeblockName = fixture.debugElement.query(By.css(NAME_SELECTOR));
      expect(codeblockName).toBeTruthy();
    });

    it("should not have an edit text when name is disabled", async(() => {
      component.isNamed = false;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const codeblockName = fixture.debugElement.query(By.css(NAME_SELECTOR));
        expect(codeblockName).toBeFalsy();
      });
    }));
  });

  describe("sections", () => {
    const SECTION_STEPS = ".sections-steps .section-steps";
    it("should have the list of sections displayed", async(() => {
      component.sectionNames = ["Given", "When", "Then"];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const sections = fixture.debugElement.queryAll(By.css(SECTION_STEPS));
        expect(sections).toHaveLength(3);
      });
    }));
  });
});
