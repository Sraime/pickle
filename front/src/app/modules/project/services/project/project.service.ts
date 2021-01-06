import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { HttpOptionsBuilder } from "src/app/modules/auth/libs/HttpOptionsBuilder/HttpOptionsBuilder";
import { ApiFeature } from "src/app/modules/board/services/api/feature/api-feature.interface";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    private httpOptionsBuilder: HttpOptionsBuilder
  ) {}

  projectUrl = environment.api.project.url;
  featureUrl = environment.api.feature.url;

  getProjectFeatures(projectId: string): Observable<ApiFeature[]> {
    const h = this.httpOptionsBuilder.getHeader();
    return this.http.get<ApiFeature[]>(
      this.projectUrl + "/" + projectId + "/feature",
      {
        headers: h,
      }
    );
  }

  createProjectFeature(
    name: string,
    projectId: string
  ): Observable<ApiFeature> {
    const h = this.httpOptionsBuilder.getHeader();
    return this.http.post<ApiFeature>(
      this.projectUrl + "/" + projectId + "/feature",
      { name },
      {
        headers: h,
      }
    );
  }
}
