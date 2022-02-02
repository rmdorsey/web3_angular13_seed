import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InstallablePromptComponent } from './core/components/installable-prompt/installable-prompt.component';
import { RouterModule } from '@angular/router';

import { HdWalletAdapterModule } from '@heavy-duty/wallet-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoaderComponent,
    InstallablePromptComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    HdWalletAdapterModule.forRoot({ autoConnect: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
