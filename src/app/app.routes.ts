import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RutasComponent } from './pages/rutas/rutas.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // Las rutas hijas se renderizarán dentro del <router-outlet> de MainLayoutComponent
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rutas', component: RutasComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ],
  },

  // Aquí irían otras rutas que no usen el MainLayout, como Login o 404
  // { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }, // Redirige a dashboard si la ruta no existe
];
