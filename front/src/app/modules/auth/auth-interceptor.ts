import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SessionService } from "./services/session/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.sessionService.getSessionData("token").id;
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
