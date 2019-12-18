import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, }   from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;
  let router = {
      navigate: jest.fn()
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ HttpClientModule, FormsModule, ReactiveFormsModule ,
        MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [ 
        AuthService, 
        { 
          provide: Router, 
          useValue: router
        }
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const form = fixture.debugElement.query(By.css('#login-form'))
      expect(form).toBeTruthy();
    });
  }));

  it('should have an email field inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputEmail = fixture.debugElement.query(By.css('#login-form input[name=email]'));
      expect(inputEmail).toBeTruthy();
    })
  }));

  it('should have an password field inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputPwd = fixture.debugElement.query(By.css('#login-form input[name=password]'));
      expect(inputPwd).toBeTruthy();
    })
  }));

  it('should have a login button inside the form', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btnLogin = fixture.debugElement.query(By.css('#login-form button'));
      expect(btnLogin.nativeElement.textContent).toEqual("connexion");
    })
  }));

  it('should not have the error message displayed by default', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('#login-error'));
      expect(errorMessage).toBeFalsy();
    });
  }));

  it('should display an error message when an error is handled', async(() => {
    const message = "email ou mot de passe invalide";
    component.idInvalidAuth = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('#login-error'));
      expect(errorMessage.nativeElement.textContent).toEqual(message);
    });
  }));

  describe('submit form', () => {
    let spyLogin;

    beforeEach(() => {
      spyLogin = jest.spyOn(authService, 'login');
    });
    
    it('should request the server with given data', async(() => {
      const email = "aaaa@bb.cc";
      const pwd = "azery";
      spyLogin.mockReturnValue(of({}));

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let iemail = fixture.debugElement.query(By.css('#login-form input[name=email]')).nativeElement;
        iemail.value = email;
        iemail.dispatchEvent(new Event('input'));
        let ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        ipwd.value = pwd;
        ipwd.dispatchEvent(new Event('input'));
        const btnLogin = fixture.debugElement.query(By.css('#login-form button'));
        btnLogin.nativeElement.click();

        expect(spyLogin).toHaveBeenCalledWith(email, pwd);
      });
    }));
    

    it('should turn to error when login fail', async(() => {
      spyLogin.mockReturnValue(throwError("error"));
      component.form.controls['email'].setValue("test@test.com");
      component.form.controls['password'].setValue("123456789");
      component.onSubmit();
      expect(component.idInvalidAuth).toEqual(true);
    }));

    it('should reset the password field when login fail', async(() => {
      const pwd = "azery";
      spyLogin.mockReturnValue(throwError("error"));

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        ipwd.value = pwd;
        ipwd.dispatchEvent(new Event('input'));
        component.onSubmit();
        ipwd = fixture.debugElement.query(By.css('#login-form input[name=password]')).nativeElement
        expect(ipwd.value).toEqual("");
      });
    }));

    it('should redirect to the bank page when login succeed', async(() => {
      spyLogin.mockReturnValue(of());
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/bank']);
    }));

  });

});
