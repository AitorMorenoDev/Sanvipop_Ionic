import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {baseUrlInterceptor} from "./app/interceptors/base-url.interceptor";
import {authTokenInterceptor} from "./app/interceptors/auth-token.interceptor";
import {provideBingmapsKey} from "./app/bingmaps/bingmaps.config";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([baseUrlInterceptor, authTokenInterceptor])),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideBingmapsKey('AipGv-br9tFmSkamrlbvhTK-uL1J7nm6PbcUcy73pGQQHMn6x9-_3rBSkmUMJ4Xo'),
  ],
});
