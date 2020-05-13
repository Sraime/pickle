import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { LoginActivate } from '../auth/LoginActivateGuard';

const featuresRoutes: Routes = [{ path: 'feature', component: FeaturesPageComponent, canActivate: [LoginActivate] }];

@NgModule({
	imports: [RouterModule.forChild(featuresRoutes)],
	exports: [RouterModule],
  providers: [LoginActivate]
})
export class FeatureManagementRoutingModule {}
