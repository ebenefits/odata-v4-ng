import {enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {ODataModule} from 'odata-v4-ng';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app/routes";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      RouterModule.forRoot(routes),
      ODataModule,
      TabViewModule,
      InputTextModule,
      FormsModule,
      TabViewModule
    )]
})
  .catch(err => console.error(err));
