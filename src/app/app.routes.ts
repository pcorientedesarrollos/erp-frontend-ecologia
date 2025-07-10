import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'unidades',
        loadComponent: () =>
          import('./pages/transport-units/transport-units.component').then(
            (m) => m.TransportUnitsComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirige cualquier otra ruta a la página principal
];
