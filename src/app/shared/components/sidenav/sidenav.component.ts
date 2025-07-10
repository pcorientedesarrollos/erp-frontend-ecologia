import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// Interfaz para definir la estructura de un item del menú
interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    // Módulos de Angular Material para la lista y los íconos
    MatListModule,
    MatIconModule,
    // RouterModule para que funcionen los routerLink
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  // Hacemos el menú configurable a través de un array.
  // Esto es escalable: para añadir un nuevo enlace, solo modificas este array.
  public menuItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'group', label: 'Usuarios', route: '/users' },
    { icon: 'inventory_2', label: 'Productos', route: '/products' },
    { icon: 'settings', label: 'Configuración', route: '/settings' },
  ];
}
