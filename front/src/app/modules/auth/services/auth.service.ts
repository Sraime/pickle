import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpOptionsBuilder } from '../libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterResponse } from '../interfaces/resgister-responsel'
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpBuilder: HttpOptionsBuilder;

  baseAuthUrl = environment.api.auth.url;

  loginSubject: Subject<boolean>;

  constructor(private http: HttpClient) { 
    this.httpBuilder = new HttpOptionsBuilder();
    this.loginSubject = new Subject<boolean>();
  }

  login(email: String, password: String): Observable<AuthResponse> {
    let h: HttpHeaders = this.httpBuilder.getHeader();
    return  this.http.post<AuthResponse>(this.baseAuthUrl+'/signin', {email: email, password: password}, {headers: h})
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response.token.toString());
          localStorage.setItem('pseudo', response.pseudo.toString());
          localStorage.setItem('tokenExpiration', response.tokenExpiration.toString());
          this.loginSubject.next(true);
          setTimeout(() => {
            this.logout();
          },response.tokenExpiration.valueOf() - Date.now() - 10000)
        })
      )
  }

  isLoggedIn():boolean { 
    const delay = parseInt(localStorage.getItem('tokenExpiration')) - Date.now();
    return delay > 0 ? true : false;
  }

  getLoginEvent(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("pseudo");
    this.loginSubject.next(false);
  }

  register(pseudo, email, password): Observable<RegisterResponse> {
    let h: HttpHeaders = this.httpBuilder.getHeader();
    return  this.http.post<RegisterResponse>(this.baseAuthUrl+'/signup', 
      {pseudo: pseudo, email: email, password: password}, 
      {headers: h})
  }
}
