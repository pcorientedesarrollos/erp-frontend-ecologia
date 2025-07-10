import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importaciones de Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Importamos nuestro componente Sidenav
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, // Necesario para renderizar las páginas (Dashboard, etc.)
    SidenavComponent, // Nuestro Sidenav
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  public isDarkMode = false;

  toggleTheme(event: any) {
    this.isDarkMode = event.checked;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}
