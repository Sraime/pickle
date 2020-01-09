import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { BoardModule } from './modules/board/board.module';
import { AppInitService } from './services/app-init/app-init.service';

export function init_app(appLoadService: AppInitService) {
	return () => appLoadService.init();
}

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		LoginModule,
		BoardModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule
	],
	providers: [
		AppInitService,
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AppInitService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
