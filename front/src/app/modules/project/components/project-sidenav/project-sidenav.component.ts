import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiFeature } from "src/app/modules/board/services/api/feature/api-feature.interface";
import { ApiProject, UserService } from "../../services/user/user.service";
import { FeaturesUpdaterService } from "../../services/updater/features-updater.service";
import { ProjectService } from "../../services/project/project.service";
import { SessionService } from "src/app/modules/auth/services/session/session.service";
import { ProjectSynchronizationManager } from "../../services/synchronizer/project-synchronization-manager";

@Component({
  selector: "project-sidenav",
  templateUrl: "./project-sidenav.component.html",
  styleUrls: ["./project-sidenav.component.scss"],
})
export class ProjectSidenavComponent implements OnInit {
  features: ApiFeature[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private featuresUpdater: FeaturesUpdaterService,
    private userService: UserService,
    private sessionService: SessionService,
    private projetSynchroManaer: ProjectSynchronizationManager
  ) {}

  projects: ApiProject[] = [];
  selectedProject: ApiProject = { _id: "", name: "" };

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.userService.getUserProjects().subscribe((projects) => {
      this.projects = projects;
      this.selectedProject = this.projects[0];
      this.sessionService.setSessionData("project", this.selectedProject);
      this.loadProjectFeatures();
    });
  }
  loadProjectFeatures() {
    this.projectService
      .getProjectFeatures(this.selectedProject._id)
      .subscribe((features) => {
        this.features = features;
        this.startProjectSynchro();
      });
  }

  startProjectSynchro() {
    this.projetSynchroManaer.enableRoomSynchronization(
      this.selectedProject._id
    );
    this.featuresUpdater.getObservable().subscribe((update) => {
      this.features = update as ApiFeature[];
    });
  }

  navigateToBoard(featureId) {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/board/" + featureId]);
    });
  }
}
