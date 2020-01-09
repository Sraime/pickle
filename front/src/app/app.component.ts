import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { FeatureToggleService } from './services/feature-toggle/feature-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean;

  pseudo: string;

  private isAuthFeatureEnabled: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private featureToggleService: FeatureToggleService) {}

  ngOnInit() {
    this.isAuthFeatureEnabled = this.featureToggleService.isFeatureEnabled('auth');
    if (!this.isAuthFeatureEnabled) { return; }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.pseudo = this.isLoggedIn ? localStorage.getItem('pseudo') : '';
    this.authService.getLoginEvent().subscribe((newLoginState) => {
      this.isLoggedIn = newLoginState;
      if (newLoginState !== false) {
        this.pseudo = localStorage.getItem('pseudo');
      }
    });
  }

  singout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
