import {enableProdMode, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {routes} from "./app/routes";
import {provideHttpClient, withXhr} from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withXhr()),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(routes)
    )
  ]
})
  .catch(err => console.error(err));
