import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean;

  pseudo: string;

  constructor(private authService: AuthService, 
    private router: Router){}
  
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.pseudo = this.isLoggedIn ? localStorage.getItem('pseudo') : "";
    this.authService.getLoginEvent().subscribe((newLoginState) => {
      this.isLoggedIn = newLoginState;
      if(newLoginState !== false) {
        this.pseudo = localStorage.getItem('pseudo');
      }
    });
  }

  singout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
