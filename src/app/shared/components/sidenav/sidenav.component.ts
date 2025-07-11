import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// La interfaz no cambia
interface NavItem {
  icon: string;
  label: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  // Implementa OnInit
  // El array que la plantilla HTML va a renderizar. Empezará vacío.
  public menuItems: NavItem[] = [];

  // Usamos un Set para guardar los items que están expandidos. Es más escalable.
  public expandedItems = new Set<NavItem>();

  // El menú completo. Lo hacemos privado y es nuestra "fuente de la verdad".
  private readonly _sourceMenuItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    {
      icon: 'collections_bookmark',
      label: 'Catálogos',
      children: [
        { icon: 'group', label: 'Usuarios', route: '/users' },
        { icon: 'inventory_2', label: 'Productos', route: '/products' },
      ],
    },
    { icon: 'settings', label: 'Configuración', route: '/settings' },
  ];

  ngOnInit(): void {
    // Al iniciar, construimos el menú por primera vez (estará colapsado)
    this.rebuildMenu();
  }

  // La función que se llama al hacer clic en un item expandible
  toggleSubMenu(item: NavItem): void {
    // Si el item ya estaba en el Set, lo quitamos (colapsar).
    // Si no estaba, lo añadimos (expandir).
    if (this.expandedItems.has(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
    // Después de cualquier cambio, reconstruimos el menú visible
    this.rebuildMenu();
  }

  // La función mágica que construye el array visible
  private rebuildMenu(): void {
    const newMenuItems: NavItem[] = [];

    for (const item of this._sourceMenuItems) {
      // Siempre añadimos el item de primer nivel (ej: Dashboard, Catálogos, etc.)
      newMenuItems.push(item);

      // Si el item tiene hijos Y está en nuestro Set de expandidos...
      if (item.children && this.expandedItems.has(item)) {
        // ...añadimos todos sus hijos a la lista principal
        newMenuItems.push(...item.children);
      }
    }

    // Reemplazamos el array antiguo con el nuevo
    this.menuItems = newMenuItems;
  }
}
