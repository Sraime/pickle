import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeaturesPageComponent } from "./components/features-page/features-page.component";
import { LoginActivate } from "../auth/LoginActivateGuard";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

const featuresRoutes: Routes = [
  {
    path: "feature",
    component: FeaturesPageComponent,
    canActivate: [LoginActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule, MatButtonModule, MatIconModule],
  providers: [LoginActivate],
})
export class FeatureManagementRoutingModule {}
