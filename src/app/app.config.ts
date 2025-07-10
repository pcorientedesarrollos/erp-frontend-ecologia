// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. IMPORTA provideAnimations
import { provideAnimations } from '@angular/platform-browser/animations';

// Estos son para SSR, puedes mantenerlos si los generó el CLI
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

// Estos son para Zoneless, la nueva forma de detección de cambios de Angular. ¡Es genial que lo estés usando!
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // El orden no importa, pero las comas son cruciales
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideAnimations(), // 2. AÑADE LA COMA ANTES
    provideClientHydration(withEventReplay()),
    // El provider de errores globales lo quitamos por simplicidad, no es necesario para empezar
  ],
};
