import { ApplicationConfig, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { getWindow } from 'ssr-window';



export const WINDOW = new InjectionToken('WindowToken');
@Injectable()
export class BrowserWindowRef {
  get nativeWindow(): Window | object {
    return window;
  }

}
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: object): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return getWindow();
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()],
};
