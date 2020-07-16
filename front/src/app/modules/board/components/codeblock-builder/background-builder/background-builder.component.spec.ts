import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BackgroundBuilderComponent } from "./background-builder.component";
import { MockComponent } from "ng-mocks";
import { SectionStepsComponent } from "../../section-steps/section-steps.component";
import { EditTextComponent } from "../../edit-text/edit-text.component";
import { By } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { configureTestSuite } from "ng-bullet";

describe("BackgroundBuilderComponent", () => {
  let component: BackgroundBuilderComponent;
  let fixture: ComponentFixture<BackgroundBuilderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackgroundBuilderComponent,
        MockComponent(SectionStepsComponent),
        MockComponent(EditTextComponent)
      ],
      imports: [MatIconModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the label Background", () => {
    const labelElement = fixture.debugElement.query(
      By.css(".codeblock-header label")
    );
    expect(labelElement.nativeElement.textContent).toEqual("Background: ");
  });

  it("should have the 1 section Given", () => {
    const sectionElements = fixture.debugElement.queryAll(
      By.css("section-steps")
    );
    expect(sectionElements).toHaveLength(1);
  });
});
