import { Component, OnInit } from "@angular/core";
import { ApiFeature } from "src/app/modules/board/services/api/feature/api-feature.interface";
import { Router } from "@angular/router";
import { ProjectService } from "../../services/project/project.service";
import { SessionService } from "src/app/modules/auth/services/session/session.service";

@Component({
  selector: "app-features-page",
  templateUrl: "./features-page.component.html",
  styleUrls: ["./features-page.component.scss"],
})
export class FeaturesPageComponent implements OnInit {
  displayedColumns = ["name"];
  features: ApiFeature[] = [];
  projectId: string;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private sessionsService: SessionService
  ) {}

  ngOnInit(): void {
    this.refreshProjectData();
    this.sessionsService.getSessionEventUpdate().subscribe((sesssionObject) => {
      this.refreshProjectData();
    });
  }

  goToBoard(featureId) {
    this.router.navigate(["board/" + featureId]);
  }

  addNewFeature() {
    this.projectService
      .createProjectFeature("New Feature", this.projectId)
      .subscribe((createdFeature) => {
        this.router.navigate(["board/" + createdFeature._id], {
          state: { isFirstNavigation: true },
        });
      });
  }

  refreshProjectData() {
    const currentProject = this.sessionsService.getSessionData("project");
    if (currentProject._id) {
      this.loadProjectFeatures(currentProject._id);
      this.projectId = currentProject._id;
    }
  }

  loadProjectFeatures(projectId: string) {
    this.projectService
      .getProjectFeatures(projectId)
      .subscribe((loadedFeatures) => {
        this.features = loadedFeatures;
      });
  }
}
