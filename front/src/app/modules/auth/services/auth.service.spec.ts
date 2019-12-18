import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpOptionsBuilder } from '../libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { HttpHeaders } from '@angular/common/http';
import { of, Subject } from 'rxjs';

describe('AuthService', () => {
  let http : HttpClient;
  let builder: HttpOptionsBuilder = new HttpOptionsBuilder();
  let service: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpOptionsBuilder],
      imports: [ HttpClientModule ]
    })
    http = TestBed.get(HttpClient);
    service = TestBed.get(AuthService);
    jest.mock('../libs/HttpOptionsBuilder/HttpOptionsBuilder');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    let spyPost;
    let spyNextSubject;

    beforeEach(() => {
      spyPost = jest.spyOn(http, 'post');
      spyNextSubject = jest.fn();
      service.loginSubject = new Subject<boolean>();
      spyNextSubject =  jest.spyOn(service.loginSubject, 'next');
      //FIXME: le mock du localStorage ne fonctionne pas, il faudrait corriger ça pour que le test soit unitaire
      /*
      spySetItem = jest.fn();
      var localStorageMock = {
        setItem: spySetItem
      };
      Object.defineProperty(window, 'localStorage', localStorageMock);
      */
      // spy de la getHeader sur HttpOptionsHeader avec un return value sur un mock de HttpHeaders
    });

    /*
    it('should make a post request to the service with email:aa@bb.cc and pwd:azerty', () => {
      service.login('aa@bb.cc', 'azerty');
      // ajouter le mock en retour de getHeader dans le 3em param du expect
      expect(spyPost).toHaveBeenCalledWith('localhost:3000/login', {email: 'aa@bb.cc', password: 'azerty'});
    });
    */

    it('should store the token in local storage', async(() => {
      const response = {pseudo: new String("toto"), token: new String("azerty"), tokenExpiration: new Number(10)}
      spyPost.mockReturnValue(of(response));
      let obs = service.login('aa@bb.cc', 'azerty');
      obs.subscribe((v) => {
        // FIXME: il faudrait expect le call sur le spy du setItem du localStorage
        expect(localStorage.getItem('token')).toEqual(response.token.toString());
        expect(localStorage.getItem('pseudo')).toEqual(response.pseudo.toString());
        expect(localStorage.getItem('tokenExpiration')).toEqual("10");
      });
      
    }));

    it('should dispatch the event login Subject', async(() => {
      const response = {pseudo: new String("toto"), token: new String("azerty"), tokenExpiration: new Number(10)}
      spyPost.mockReturnValue(of(response));
      let obs = service.login('aa@bb.cc', 'azerty');
      obs.subscribe((v) => {
        expect(spyNextSubject).toHaveBeenCalledWith(true);
      });
    }));

    
    // FIXME: trouver un moyen de faire un mock du setTimeout
    /*
    it('should logout 10 secondes before the expiration date',() => {

    });
    */
  });

  describe('isLoggedIn()', () => {
    
    it('should return false when the token is not set in the localStorage', () => {
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return false when the token expired', () => {
      const expires = Date.now()-1;
      localStorage.setItem('tokenExpiration', expires+"");
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return true when the token is set and not expired', () => {
      localStorage.setItem('token', "azerty");
      const expires = Date.now()+1000;
      localStorage.setItem('tokenExpiration', expires+"");
      expect(service.isLoggedIn()).toEqual(true);
    })
  });

  describe('getLoginEvent()', () => {
      let sub: Subject<boolean>;

      beforeEach(() => { 
        sub = new Subject<boolean>();
        service.loginSubject = sub;
      });

      it('should trigger login action to Observers', async(() => {
        service.getLoginEvent().subscribe((val) => {
          expect(val).toBeTruthy();
        });
        sub.next(true)
      }));

      it('should trigger logout action to Observers', async(() => {
        service.getLoginEvent().subscribe((val) => {
          expect(val).toBeFalsy();
        });
        sub.next(false)
      }));
  });

  describe('logout()', () => {
    
    let spyNextSubject;

    beforeEach(() => {
      spyNextSubject = jest.fn();
      service.loginSubject = new Subject<boolean>();
      spyNextSubject =  jest.spyOn(service.loginSubject, 'next');
    });
    it('should store the token in local storage', () => {
      service.logout();
      // FIXME: il faudrait expect le call sur un spy du setItem du localStorage
      expect(localStorage.getItem('token')).toBeFalsy();
      expect(localStorage.getItem('pseudo')).toBeFalsy();
      expect(localStorage.getItem('tokenExpiration')).toBeFalsy();
      
    });

    it('should dispatch the event login Subject', () => {
      service.logout();
      expect(spyNextSubject).toHaveBeenCalledWith(false);
    });
  });

  describe('register', () => {
    let spyPost;
    let httpOtions;

    beforeEach(() => {
      spyPost = jest.spyOn(http, 'post');
      const spyGetHeader = jest.fn();
      httpOtions  = {};
      HttpOptionsBuilder.prototype.getHeader = jest.fn().mockReturnValue(httpOtions);
    });
 
    it('should send a request to the server', () => {
      const nuser = {email: "tt.tt@tt.com", pseudo: "Tym", password: "xxxxx"};
      service.register(nuser.pseudo,nuser.email,nuser.password)
      expect(spyPost).toHaveBeenCalledWith('http://localhost:3000/auth/signup', nuser, {headers:httpOtions});
    });
    
  });
});
