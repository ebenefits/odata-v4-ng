import {enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {routes} from "./app/routes";
import {provideHttpClient} from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(routes),
      TabViewModule,
      InputTextModule,
      FormsModule,
      TabViewModule
    )]
})
  .catch(err => console.error(err));
