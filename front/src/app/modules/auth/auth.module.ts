import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { LoginRoutingModule } from "./auth-routing.module";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { AuthInterceptor } from "./auth-interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { SessionService } from "./services/session/session.service";

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
  exports: [SessionService],
})
export class LoginModule {}
