import { MapsComponent, MapRoute, MapMarker } from '../../maps/maps.component'; // Asegúrate de que la ruta sea correcta
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// ---

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Tus servicios y modelos
import {
  DashboardCard,
  DashboardService,
} from '../../services/dashboard/dashboard.service';

// Importaciones para el mapa

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MapsComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  public dashboardCards: DashboardCard[] = [];
  public isLoading = true;

  public vehicleRoutes: MapRoute[] = [];
  public vehicleMarkers: MapMarker[] = [];
  public mapCenter: google.maps.LatLngLiteral = { lat: 20.9754, lng: -89.6169 };
  public mapZoom = 12;

  public filterControl = new FormControl('');

  // 2. La lista completa de opciones (luego la obtendrás de un servicio)
  private allFilterOptions: string[] = [
    'Vehículo 01 - Placas ABC-123',
    'Vehículo 02 - Placas XYZ-789',
    'Operador: Juan Pérez',
    'Operador: Ana García',
    'Ruta: Centro Histórico',
    'Ruta: Periférico Norte',
  ];

  public filteredOptions$!: Observable<string[]>;

  ngOnInit(): void {
    this.loadDashboardData();
    this.prepareMapData();
    this.filteredOptions$ = this.filterControl.valueChanges.pipe(
      startWith(''), // Muestra todas las opciones al principio
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFilterOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  loadDashboardData(): void {
    this.isLoading = true;
    const mockCardData: DashboardCard[] = [
      {
        title: 'Vehículos en Ruta',
        value: '2',
        icon: 'local_shipping',
        color: '#1E90FF',
      },
      {
        title: 'Distancia Total Hoy',
        value: '124 km',
        icon: 'multiple_stop',
        color: '#C71585',
      },
      {
        title: 'Alertas Recientes',
        value: '3',
        icon: 'warning',
        color: '#ff9800',
      },
      {
        title: 'Próximo Mantenimiento',
        value: 'En 5 días',
        icon: 'build',
        color: '#4caf50',
      },
    ];
    of(mockCardData)
      .pipe(delay(1000))
      .subscribe((data) => {
        this.dashboardCards = data;
        this.isLoading = false;
      });
  }

  prepareMapData(): void {
    const routeData1 = [
      { lat: 20.996758676838088, lng: -89.63040649124005 },
      { lat: 20.960218077694073, lng: -89.58550588939157 },
      { lat: 20.94169329300094, lng: -89.59584579941492 },
      { lat: 20.9367624061147, lng: -89.65711853337132 },
      { lat: 20.971549430093024, lng: -89.63960907360868 },
      { lat: 20.972511168353606, lng: -89.64201233279177 },
    ];
    const routeData2 = [
      { lat: 21.03725396460177, lng: -89.6293093897864 },
      { lat: 20.996758676838088, lng: -89.63040649124005 },
      { lat: 20.985769502411696, lng: -89.61706779014675 },
    ];

    this.vehicleRoutes = [
      {
        path: routeData1,
        options: {
          strokeColor: '#C71585',
          strokeWeight: 6,
          strokeOpacity: 0.85,
        },
      },
      {
        path: routeData2,
        options: {
          strokeColor: '#1E90FF',
          strokeWeight: 6,
          strokeOpacity: 0.85,
        },
      },
    ];

    const truckIconMagenta =
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C71585" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 12V9.5h2.5l1.97 2.5H17z"/></svg>`
      );
    const truckIconBlue =
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1E90FF" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 12V9.5h2.5l1.97 2.5H17z"/></svg>`
      );

    this.vehicleMarkers = [
      {
        position: routeData1[routeData1.length - 1],
        options: {
          title: 'Vehículo 1',
          icon: {
            url: truckIconMagenta,
            scaledSize: new google.maps.Size(40, 40),
          },
        },
      },
      {
        position: routeData2[routeData2.length - 1],
        options: {
          title: 'Vehículo 2',
          icon: {
            url: truckIconBlue,
            scaledSize: new google.maps.Size(40, 40),
          },
        },
      },
    ];
  }
}
