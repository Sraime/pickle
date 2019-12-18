import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailErrorStateMatcher } from '../../libs/EmailErrorStateMatcher/EmailErrorStateMatcher'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      pseudo: ['', [
        Validators.minLength(3),
        Validators.maxLength(15), 
        Validators.required, 
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      email: ['', [
        Validators.maxLength(30), 
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required 
      ]]
    });
  }

  onSubmit() {
    if(this.form.valid) {
      let t = this.authService.register(this.form.value.pseudo,this.form.value.email,this.form.value.password);
      t.subscribe(
          (result) => {
            this.router.navigate(['/auth/login']);
          },
          (err) => {
            err.error.forEach((elem) => {
              const ferr = {}
              ferr[elem[1][0]] = true;
              this.form.controls[elem[0]].setErrors(ferr);
            })
          }
        );
    }
  }


  matcher = new EmailErrorStateMatcher();

}
