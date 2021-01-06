import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeaturesPageComponent } from "./features-page.component";
import { By } from "@angular/platform-browser";
import { ProjectService } from "../../services/project/project.service";
import { Observable, Subject } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ApiFeature } from "src/app/modules/board/services/api/feature/api-feature.interface";
import { Router } from "@angular/router";

jest.mock("@angular/router");
jest.mock("../../services/user-feature/user-feature.service");
const mockUserFeatureService: jest.Mocked<ProjectService> = new ProjectService(
  null,
  null
) as jest.Mocked<ProjectService>;

const mockRouter: jest.Mocked<Router> = {} as jest.Mocked<Router>;
const subjectGetFeatures: Subject<ApiFeature[]> = new Subject<ApiFeature[]>();
mockUserFeatureService.getProjectFeatures.mockReturnValue(subjectGetFeatures);

describe("FeaturesPageComponent", () => {
  let component: FeaturesPageComponent;
  let fixture: ComponentFixture<FeaturesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesPageComponent],
      imports: [MatTableModule, MatIconModule],
      providers: [
        {
          provide: ProjectService,
          useValue: mockUserFeatureService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the title : Features", () => {
    const title = fixture.debugElement.query(By.css("h2"));
    expect(title.nativeElement.textContent).toEqual("Features");
  });

  it("should have load features in a table", () => {});

  it("should have 3 row", async(() => {
    const loadedFeatures: ApiFeature[] = [
      { name: "f1", _id: null },
      { name: "f2", _id: null },
      { name: "f3", _id: null },
    ];
    subjectGetFeatures.next(loadedFeatures);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const col = fixture.debugElement.nativeElement.querySelector(
        "#feature-table tbody"
      );
      expect(col.children.length).toEqual(3);
    });
  }));

  it("should have a row with the feature name", async(() => {
    const loadedFeatures: ApiFeature[] = [{ name: "my feature", _id: null }];
    subjectGetFeatures.next(loadedFeatures);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const col = fixture.debugElement.nativeElement.querySelector(
        "#feature-table tbody tr:first-child td:first-child"
      );
      expect(col.textContent.trim()).toEqual("my feature");
    });
  }));

  describe("add featrure", () => {
    let btnAddFeature;

    beforeEach(() => {
      btnAddFeature = fixture.debugElement.query(By.css(".btn-add-feature"));
    });

    it("should have a btn for adding a new feature", () => {
      expect(btnAddFeature).toBeTruthy();
    });

    it("should ask the feature service for creating new feature when the btn is clicked", async(() => {
      btnAddFeature.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(
          mockUserFeatureService.createProjectFeature
        ).toHaveBeenCalledWith("New Feature");
      });
    }));

    it("should redirect to the feature board of created feature", () => {
      mockUserFeatureService.createProjectFeature.mockReturnValue(
        new Observable<ApiFeature>((s) => {
          s.next({ _id: "xxx", name: "" });
        })
      );
      btnAddFeature.nativeElement.click();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["board/xxx"]);
    });
  });
});
