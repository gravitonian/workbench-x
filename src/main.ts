import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* Initialize PDF JS Library that is used by ADF Content Preview component */
import pdfjsLib from 'pdfjs-dist';
pdfjsLib.PDFJS.workerSrc = 'pdf.worker.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
