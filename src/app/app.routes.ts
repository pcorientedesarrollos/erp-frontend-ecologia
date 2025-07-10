import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // Las rutas hijas se renderizarán dentro del <router-outlet> de MainLayoutComponent
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Aquí añadirías más rutas como:
      // { path: 'users', component: UsersComponent },
      // { path: 'products', component: ProductsComponent },
      // { path: 'settings', component: SettingsComponent },

      // Redirección por defecto: si la ruta está vacía, va a /dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Aquí irían otras rutas que no usen el MainLayout, como Login o 404
  // { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }, // Redirige a dashboard si la ruta no existe
];
