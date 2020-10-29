import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiFeature } from "src/app/modules/board/services/api/feature/api-feature.interface";
import { UserFeatureService } from "src/app/modules/feature-management/services/user-feature/user-feature.service";

@Component({
  selector: "project-sidenav",
  templateUrl: "./project-sidenav.component.html",
  styleUrls: ["./project-sidenav.component.scss"],
})
export class ProjectSidenavComponent implements OnInit {
  features: ApiFeature[] = [];

  constructor(
    private userFeatureService: UserFeatureService,
    private router: Router
  ) {}

  projects = [
    {
      _id: "xx",
      name: "Default Project",
    },
  ];
  selectedProject = this.projects[0]._id;

  ngOnInit(): void {
    this.userFeatureService.getUserFeatures().subscribe((loadedFeatures) => {
      this.features = loadedFeatures;
    });
  }
}
