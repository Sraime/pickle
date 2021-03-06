import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SectionStepItemComponent } from "./section-step-item.component";
import { configureTestSuite } from "ng-bullet";
import { By } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { EditStepDialogComponent } from "../../edit-step-dialog/edit-step-dialog.component";
import { of } from "rxjs";
import { Step } from "../../../services/updaters/section-updater/step.interface";

describe("SectionStepItemComponent", () => {
  let component: SectionStepItemComponent;
  let fixture: ComponentFixture<SectionStepItemComponent>;
  const stubEditDialog = {
    open: jest.fn()
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [SectionStepItemComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: MatDialog,
          useValue: stubEditDialog
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubEditDialog.open.mockReturnValue({
      afterClosed: () => of()
    });
    stubEditDialog.open.mockClear();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should should display the name of the step", async(() => {
    component.name = "step1";
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const name = fixture.debugElement.query(By.css(".step-name"));
      expect(name.nativeElement.textContent).toEqual("step1");
    });
  }));

  describe("delete", () => {
    beforeAll(() => {});
  });
  it("should have a delete button", () => {
    const del = fixture.debugElement.query(By.css(".btn-step-del"));
    expect(del).toBeTruthy();
  });

  it("should emit an event when the del button is pressed", done => {
    component.name = "step1";
    const del = fixture.debugElement.query(By.css(".btn-step-del"));
    component.delEvent.subscribe(step => {
      expect(step.name).toEqual("step1");
      done();
    });
    del.nativeElement.dispatchEvent(new Event("click"));
  });

  describe("edit", () => {
    it("should open the edit dialog on click", () => {
      component.name = "step1";
      const step = fixture.debugElement.query(By.css(".step-content-item"));
      step.nativeElement.click();
      expect(stubEditDialog.open).toHaveBeenCalledWith(
        EditStepDialogComponent,
        {
          width: "400px",
          data: { name: "step1" }
        }
      );
    });

    it("should emit an event with the updated name returned by the edit dialog", done => {
      component.name = "step1";
      stubEditDialog.open.mockReturnValue({
        afterClosed: () => of({ name: "edited" })
      });
      component.updateEvent.subscribe((step: Step[]) => {
        expect(step).toEqual([{ name: "step1" }, { name: "edited" }]);
        done();
      });
      const step = fixture.debugElement.query(By.css(".step-content-item"));
      step.nativeElement.click();
    });
  });
});
