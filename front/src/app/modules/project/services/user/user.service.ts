import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpOptionsBuilder } from "src/app/modules/auth/libs/HttpOptionsBuilder/HttpOptionsBuilder";
import { SessionService } from "src/app/modules/auth/services/session/session.service";
import { environment } from "src/environments/environment";
export interface ApiProject {
  _id: string;
  name: string;
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  userUrl = environment.api.user.url;
  constructor(
    private http: HttpClient,
    private httpOptionsBuilder: HttpOptionsBuilder,
    private sessionService: SessionService
  ) {}
  getUserProjects(): Observable<ApiProject[]> {
    const h = this.httpOptionsBuilder.getHeader();
    return this.http.get<ApiProject[]>(
      this.userUrl +
        "/" +
        this.sessionService.getSessionData("user").id +
        "/project",
      {
        headers: h,
      }
    );
  }
}
