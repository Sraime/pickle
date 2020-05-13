import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { FeatureManagementRoutingModule } from './feature-management-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HttpOptionsBuilder } from '../auth/libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	declarations: [FeaturesPageComponent],
	imports: [CommonModule, FeatureManagementRoutingModule, MatIconModule, MatTableModule],
	providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpOptionsBuilder
  ]
})
export class FeatureManagementModule {}
