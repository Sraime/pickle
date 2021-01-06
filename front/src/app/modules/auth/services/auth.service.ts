import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpOptionsBuilder } from "../libs/HttpOptionsBuilder/HttpOptionsBuilder";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthResponse } from "../interfaces/auth-response";
import { RegisterResponse } from "../interfaces/resgister-responsel";
import { environment } from "../../../../environments/environment";
import { SessionService } from "./session/session.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  httpBuilder: HttpOptionsBuilder;

  baseAuthUrl = environment.api.auth.url;

  loginSubject: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.httpBuilder = new HttpOptionsBuilder();
    this.loginSubject = new Subject<boolean>();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const h: HttpHeaders = this.httpBuilder.getHeader();
    return this.http
      .post<AuthResponse>(
        this.baseAuthUrl + "/signin",
        { email, password },
        { headers: h }
      )
      .pipe(
        tap((response) => {
          this.sessionService.setSessionData("user", {
            id: response._id.toString(),
            pseudo: response.pseudo.toString(),
          });
          this.sessionService.setSessionData("token", {
            id: response.token.toString(),
            expiration: response.tokenExpiration.toString(),
          });
          this.loginSubject.next(true);
          setTimeout(() => {
            this.logout();
          }, response.tokenExpiration.valueOf() - Date.now() - 10000);
        })
      );
  }

  isLoggedIn(): boolean {
    const sessionToken = this.sessionService.getSessionData("token");

    const delay =
      (sessionToken ? parseInt(sessionToken.expiration) : 0) - Date.now();
    return delay > 0;
  }

  getLoginEvent(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  logout(): void {
    this.sessionService.clearSession();
    this.loginSubject.next(false);
  }

  register(pseudo, email, password): Observable<RegisterResponse> {
    const h: HttpHeaders = this.httpBuilder.getHeader();
    return this.http.post<RegisterResponse>(
      this.baseAuthUrl + "/signup",
      { pseudo, email, password },
      { headers: h }
    );
  }
}
