import { Component, OnInit } from "@angular/core";
import { AuthService } from "./modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { FeatureToggleService } from "./services/feature-toggle/feature-toggle.service";
import { SessionService } from "./modules/auth/services/session/session.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  pseudo: string;

  isAuthFeatureEnabled: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private featureToggleService: FeatureToggleService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.isAuthFeatureEnabled = this.featureToggleService.isFeatureEnabled(
      "auth"
    );
    if (!this.isAuthFeatureEnabled) {
      return;
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.pseudo = this.isLoggedIn
      ? this.sessionService.getSessionData("user").pseudo
      : "";
    this.authService.getLoginEvent().subscribe((newLoginState) => {
      this.isLoggedIn = newLoginState;
      if (newLoginState !== false) {
        this.pseudo = this.sessionService.getSessionData("user").pseudo;
      }
    });
  }

  singout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
