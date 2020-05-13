import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [{ path: '**', component: PageNotFoundComponent }];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],

	exports: [RouterModule]
})
export class AppRoutingModule {}
