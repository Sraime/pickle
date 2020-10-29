import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectSidenavComponent } from "./components/project-sidenav/project-sidenav.component";
import { MatSelectModule } from "@angular/material/select";
import { AuthInterceptor } from "../auth/auth-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpOptionsBuilder } from "../auth/libs/HttpOptionsBuilder/HttpOptionsBuilder";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [ProjectSidenavComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [ProjectSidenavComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    HttpOptionsBuilder,
  ],
})
export class ProjectModule {}
