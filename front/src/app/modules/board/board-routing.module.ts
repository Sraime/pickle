import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { BoardFeaturePageComponent } from './components/board-feature-page/board-feature-page.component';

const routes: Routes = [
	{ path: 'board', component: BoardPageComponent },
	{ path: 'board/feature', component: BoardFeaturePageComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BoardRoutingModule {}
