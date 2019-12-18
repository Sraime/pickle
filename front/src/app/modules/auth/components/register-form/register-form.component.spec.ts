import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import { configureTestSuite } from 'ng-bullet';

import { RegisterFormComponent } from './register-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authService;
  let router = {
      navigate: jest.fn()
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      providers: [
        AuthService, 
        FormBuilder, 
        { 
          provide: Router, 
          useValue: router
        },
        ErrorStateMatcher
      ],
      imports: [HttpClientModule,FormsModule, ReactiveFormsModule,
        MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        BrowserAnimationsModule
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fields', () => {

    it('should have a form', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const form = fixture.debugElement.query(By.css('form#register-form'));
        expect(form).toBeTruthy();
      });
    });
    
    describe('pseudo', () => {

      const defaultErrorMessage = "Le Pseudo ne peut être composé que de lettres et des chiffres (3 à 15 caractères)";

      it('should have a pseudo input of type text inside the form', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-form #register-pseudo-field input[type=text]#register-pseudo'));
          expect(input).toBeTruthy();
        });
      }));
      
      it('should be required', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-pseudo'));
          expect(input.nativeElement.hasAttribute('required')).toBeTruthy();;
        });
      }));

      it('should display an error message when the lenght is under 3 characters', async(() => {
        component.form.controls['pseudo'].setValue("aa");
        component.form.controls['pseudo'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPseudo = fixture.debugElement.query(By.css('#register-pseudo-field .field-error'));
          expect(errPseudo.nativeElement.textContent.trim()).toEqual(defaultErrorMessage);
        });
      }));
      
      it('should display an error message when the lenght is over 15 characters', async(() => {
        component.form.controls['pseudo'].setValue("aaaaaaaaaaaaaaaa");
        component.form.controls['pseudo'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPseudo = fixture.debugElement.query(By.css('#register-pseudo-field .field-error'));
          expect(errPseudo.nativeElement.textContent.trim()).toEqual(defaultErrorMessage);
        });
      }));

      it('should display an error message when pseudo contains specials characters', async(() => {
        component.form.controls['pseudo'].setValue("aa##");
        component.form.controls['pseudo'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPseudo = fixture.debugElement.query(By.css('#register-pseudo-field .field-error'));
          expect(errPseudo.nativeElement.textContent.trim()).toEqual(defaultErrorMessage);
        });
      }));
    });

    describe('email', () => {

      it('should have a email input of type email inside the form', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-form #register-email-field input[type=email]#register-email'));
          expect(input).toBeTruthy();
        });
      }));
      
      it('should be required', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-email'));
          expect(input.nativeElement.hasAttribute('required')).toBeTruthy();;
        });
      }));

      it('should display an error message when the value is a valid email', async(() => {
        component.form.controls['email'].setValue("aa");
        component.form.controls['email'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errEmail = fixture.debugElement.query(By.css('#register-email-field .field-error'));
          expect(errEmail.nativeElement.textContent.trim()).toEqual("Cet email n'est pas valide");
        });
      }));
      
      it('should not display an error message when the value is correct', async(() => {
        component.form.controls['email'].setValue("aaa@aaa");
        component.form.controls['email'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errEmail = fixture.debugElement.query(By.css('#register-email-field .field-error'));
          expect(errEmail).toBeFalsy();
        });
      }));
    });

    describe('password', () => {

      const defaultErrorMessage =  "Le mot de passe doit être composé de 8 à 30 caractères";

      it('should have a password input of type password inside the form', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-form #register-password-field input[type=password]#register-password'));
          expect(input).toBeTruthy();
        });
      }));
      
      it('should be required', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const input = fixture.debugElement.query(By.css('#register-password'));
          expect(input.nativeElement.hasAttribute('required')).toBeTruthy();;
        });
      }));

      it('should not display an error message when the value is correct', async(() => {
        component.form.controls['password'].setValue("88888888");
        component.form.controls['password'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPwd = fixture.debugElement.query(By.css('#register-password-field .field-error'));
          expect(errPwd).toBeFalsy();
        });
      }));

      it('should not display an error message when the lenght is under 8 characters', async(() => {
        component.form.controls['password'].setValue("7777777");
        component.form.controls['password'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPwd = fixture.debugElement.query(By.css('#register-password-field .field-error'));
          expect(errPwd.nativeElement.textContent.trim()).toEqual(defaultErrorMessage);
        });
      }));
      
      it('should not display an error message when the lenght is over 20 characters', async(() => {
        component.form.controls['password'].setValue("212121212121212121211");
        component.form.controls['password'].markAsTouched();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errPwd = fixture.debugElement.query(By.css('#register-password-field .field-error'));
          expect(errPwd.nativeElement.textContent.trim()).toEqual(defaultErrorMessage);
        });
      }));
    });
  });

  describe('validation', () => {
    let spyRegister
    beforeEach(() => {
      spyRegister = jest.spyOn(authService, 'register');
    });

    it('should have a button "validation" inside the form', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const btn = fixture.debugElement.query(By.css('#register-form button#register-validation'));
        expect(btn.nativeElement.textContent).toEqual('Valider');
      });
    }));

    it('should send a request to the server when the form is valid', async(() => {
      const nuser = {pseudo: "Tym", email:"tym.tym@tym.fr", password:"Tymtym01"};
      spyRegister.mockReturnValue(of());

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const ipseudo = fixture.debugElement.query(By.css('#register-pseudo')).nativeElement;
        ipseudo.value = nuser.pseudo;
        ipseudo.dispatchEvent(new Event('input'));
        const iemail = fixture.debugElement.query(By.css('#register-email')).nativeElement;
        iemail.value = nuser.email;
        iemail.dispatchEvent(new Event('input'));
        const ipwd = fixture.debugElement.query(By.css('#register-password')).nativeElement;
        ipwd.value = nuser.password;
        ipwd.dispatchEvent(new Event('input'));

        const btn = fixture.debugElement.query(By.css('#register-validation')).nativeElement;
        btn.click();

        expect(spyRegister).toHaveBeenCalledWith(nuser.pseudo, nuser.email, nuser.password);
      });
    }));

    it('should not send a request if the form is not valid', () => {
      spyRegister.mockReturnValue(of());
      component.onSubmit();
      expect(spyRegister). not.toHaveBeenCalled();
    });

    describe('form is valid', () => {

      beforeEach(() => {
        component.form.controls['pseudo'].setValue("Tymm");
        component.form.controls['email'].setValue("tym.tym@tyme.com");
        component.form.controls['password'].setValue("Tymtym01");
      });
      
      it('should redirect to the bank page when login succeed', async(() => {
        spyRegister.mockReturnValue(of(null));
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
      }));
  
      it('should invalidate the email field when it is not unique', async(() => {
        spyRegister.mockReturnValue(throwError({error: [['email',['unique']]]}));
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const btnValidation = fixture.debugElement.query(By.css('#register-validation'));
          btnValidation.nativeElement.click();
          fixture.detectChanges();
          expect(component.form.controls['email'].errors.unique).toBeTruthy();
          const errEmail = fixture.debugElement.query(By.css('#register-email-field .field-error'));
          expect(errEmail.nativeElement.textContent.trim()).toEqual("Cet email n'est pas disponible");
        });
      }));
      
      it('should invalidate the email field when it is not unique', async(() => {
        spyRegister.mockReturnValue(throwError({error: [['pseudo',['unique']]]}));
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const btnValidation = fixture.debugElement.query(By.css('#register-validation'));
          btnValidation.nativeElement.click();
          fixture.detectChanges();
          expect(component.form.controls['pseudo'].errors.unique).toBeTruthy();
          const errPseudo = fixture.debugElement.query(By.css('#register-pseudo-field .field-error'));
          expect(errPseudo.nativeElement.textContent.trim()).toEqual("Ce pseudo n'est pas disponible");
        });
      }));
      
      it('should invalidate the email field when the server an email format error', async(() => {
        spyRegister.mockReturnValue(throwError({error: [['email',['format']]]}));
        component.onSubmit();
        expect(component.form.controls['email'].errors.format).toBeTruthy();
      }));
      
      it('should invalidate the pseudo field when the server return an error for it', async(() => {
        spyRegister.mockReturnValue(throwError({error: [['pseudo',['myerror']]]}));
        component.onSubmit();
        expect(component.form.controls['pseudo'].errors.myerror).toBeTruthy();
      }));
    });
  });
});
