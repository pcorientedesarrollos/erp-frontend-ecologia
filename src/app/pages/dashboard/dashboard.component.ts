import { Component, OnInit, inject } from '@angular/core';

// CommonModule es necesario para que directivas como [style] funcionen
// en componentes standalone que no importan BrowserModule.
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  DashboardCard,
  DashboardService,
} from '../../services/dashboard/dashboard.service';

// Importamos nuestro servicio y la interfaz
// import {
//   DashboardService,
//   DashboardCard,
// } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  // La única diferencia: apunta al archivo .css
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Inyección de dependencias moderna y recomendada
  private dashboardService = inject(DashboardService);

  public dashboardCards: DashboardCard[] = [];
  public isLoading = true; // Flag para mostrar un spinner de carga

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    // Asumimos que tu servicio getDashboardData() devuelve un Observable<DashboardCard[]>
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        // En un caso real, tu backend NestJS/PostgreSQL enviaría estos datos
        this.dashboardCards = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los datos del dashboard', err);
        // Es importante parar la carga incluso si hay un error
        this.isLoading = false;
        // Opcional: podrías tener un array de errores para mostrar en la UI
        // this.error = "No se pudieron cargar los datos. Inténtelo más tarde.";
      },
    });
  }
}
