import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const authRoutes: Routes = [
  {path: 'auth/login', component: LoginFormComponent},
  {path: 'auth/register', component: RegisterFormComponent},
]
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
