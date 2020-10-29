import { Routes, RouterModule } from "@angular/router";
import { LoginActivate } from "../auth/LoginActivateGuard";
import { NgModule } from "@angular/core";

const featuresRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
  providers: [LoginActivate],
})
export class ProjectRoutingModule {}
