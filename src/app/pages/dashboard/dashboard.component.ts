// import { Component, OnInit, inject } from '@angular/core';

// // CommonModule es necesario para que directivas como [style] funcionen
// // en componentes standalone que no importan BrowserModule.
// import { CommonModule } from '@angular/common';

// // Importaciones de Angular Material
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import {
//   DashboardCard,
//   DashboardService,
// } from '../../services/dashboard/dashboard.service';

// // Importamos nuestro servicio y la interfaz
// // import {
// //   DashboardService,
// //   DashboardCard,
// // } from '../../core/services/dashboard.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatIconModule,
//     MatProgressSpinnerModule,
//   ],
//   templateUrl: './dashboard.component.html',
//   // La única diferencia: apunta al archivo .css
//   styleUrl: './dashboard.component.css',
// })
// export class DashboardComponent implements OnInit {
//   // Inyección de dependencias moderna y recomendada
//   private dashboardService = inject(DashboardService);

//   public dashboardCards: DashboardCard[] = [];
//   public isLoading = true; // Flag para mostrar un spinner de carga

//   ngOnInit(): void {
//     this.loadDashboardData();
//   }

//   loadDashboardData(): void {
//     this.isLoading = true;
//     // Asumimos que tu servicio getDashboardData() devuelve un Observable<DashboardCard[]>
//     this.dashboardService.getDashboardData().subscribe({
//       next: (data) => {
//         // En un caso real, tu backend NestJS/PostgreSQL enviaría estos datos
//         this.dashboardCards = data;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error al cargar los datos del dashboard', err);
//         // Es importante parar la carga incluso si hay un error
//         this.isLoading = false;
//         // Opcional: podrías tener un array de errores para mostrar en la UI
//         // this.error = "No se pudieron cargar los datos. Inténtelo más tarde.";
//       },
//     });
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Tus servicios y modelos existentes (DashboardService se inyecta pero no se usa en la simulación)
import { DashboardCard, DashboardService } from '../../services/dashboard/dashboard.service';

// Importaciones para el mapa
import {MapsComponent, MapRoute, MapMarker } from '../../maps/maps.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MapsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  public dashboardCards: DashboardCard[] = [];
  public isLoading = true;

  // Propiedades para los datos del mapa
  public vehicleRoutes: MapRoute[] = [];
  public vehicleMarkers: MapMarker[] = [];
  public mapCenter: google.maps.LatLngLiteral = { lat: 20.9754, lng: -89.6169 };
  public mapZoom = 12;

  ngOnInit(): void {
    this.loadDashboardData();
    this.prepareMapData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // --- SIMULACIÓN DE LLAMADA A LA API ---
    // Se han comentado las líneas originales para evitar el error de red.
    // this.dashboardService.getDashboardData().subscribe({ ... });

    // Datos de prueba para que las tarjetas se muestren
    const mockCardData: DashboardCard[] = [
      { title: 'Usuarios Activos', value: '1,250', icon: 'people', color: '#3f51b5' },
      { title: 'Vehículos en Ruta', value: '2', icon: 'local_shipping', color: '#00A9E0' },
      { title: 'Alertas Recientes', value: '3', icon: 'warning', color: '#ff9800' },
      { title: 'Mantenimientos', value: '1', icon: 'build', color: '#A9007E' }
    ];

    // Simula una espera de 1 segundo, como si viniera de la red
    of(mockCardData).pipe(delay(1000)).subscribe(data => {
      this.dashboardCards = data;
      this.isLoading = false;
    });
  }

  prepareMapData(): void {
    const routeData1 = [
      { lat: 20.996758676838088, lng: -89.63040649124005 },
      { lat: 20.960218077694073, lng: -89.58550588939157 },
      { lat: 20.94169329300094,  lng: -89.59584579941492 },
      { lat: 20.9367624061147,  lng: -89.65711853337132 },
      { lat: 20.971549430093024, lng: -89.63960907360868 },
      { lat: 20.972511168353606, lng: -89.64201233279177 },
    ];
    const routeData2 = [
      { lat: 21.03725396460177,  lng: -89.6293093897864 },
      { lat: 20.996758676838088, lng: -89.63040649124005 },
      { lat: 20.985769502411696, lng: -89.61706779014675 },
    ];

    this.vehicleRoutes = [
      { path: routeData1, options: { strokeColor: '#A9007E', strokeWeight: 5, strokeOpacity: 0.9 } },
      { path: routeData2, options: { strokeColor: '#00A9E0', strokeWeight: 5, strokeOpacity: 0.9 } }
    ];
    
    this.vehicleMarkers = [
      { position: { lat: 20.9367624061147, lng: -89.65711853337132 }, options: { title: 'Aeropuerto', icon: 'https://maps.google.com/mapfiles/kml/shapes/airports.png' }},
      { position: { lat: 20.985769502411696, lng: -89.61706779014675 }, options: { title: 'Vehículo 2', icon: 'https://maps.google.com/mapfiles/ms/icons/truck.png' }}
    ];
  }
}