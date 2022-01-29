import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './core/components/app-shell/app-shell.component';
import { FirstPaintComponent } from './core/components/first-paint/first-paint.component';

const routes: Routes = [ { path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppShellComponent,
    FirstPaintComponent
  ],
  exports: [
    FirstPaintComponent
  ]
})
export class AppServerModule {}
