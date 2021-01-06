import { Routes, RouterModule } from "@angular/router";
import { LoginActivate } from "../auth/LoginActivateGuard";
import { NgModule } from "@angular/core";
import { FeaturesPageComponent } from "./components/features-page/features-page.component";

const featuresRoutes: Routes = [
  {
    path: "feature",
    component: FeaturesPageComponent,
    canActivate: [LoginActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
  providers: [LoginActivate],
})
export class ProjectRoutingModule {}
