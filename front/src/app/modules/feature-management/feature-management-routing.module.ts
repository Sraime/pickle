import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesPageComponent } from './components/features-page/features-page.component';

const featuresRoutes: Routes = [{ path: 'feature', component: FeaturesPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(featuresRoutes)],
	exports: [RouterModule]
})
export class FeatureManagementRoutingModule {}
