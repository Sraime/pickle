import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LoginModule } from "./modules/auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BoardModule } from "./modules/board/board.module";
import { AppInitService } from "./services/app-init/app-init.service";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ProjectModule } from "./modules/project/project.module";
import { SocketioConnectorService } from "./services/synchronizer/socketio-connector/socketio-connector.service";

export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    LoginModule,
    BoardModule,
    ProjectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  exports: [SocketioConnectorService],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
