import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

registerLocaleData(localeEsCo);

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'es-CO' }],
}).catch((error: unknown) => console.error(error));
