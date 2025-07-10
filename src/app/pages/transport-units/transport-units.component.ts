import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

// Modelos de datos
export interface TransportUnit {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  status: 'disponible' | 'en_ruta' | 'en_mantenimiento';
}

// Importaciones de Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-transport-units',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './transport-units.component.html',
  styleUrl: './transport-units.component.css',
})
export class TransportUnitsComponent {
  displayedColumns: string[] = [
    'plate',
    'brand',
    'model',
    'year',
    'status',
    'actions',
  ];

  dataSource: TransportUnit[] = [
    {
      id: 1,
      plate: 'ABC-123',
      brand: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      status: 'disponible',
    },
    {
      id: 2,
      plate: 'XYZ-789',
      brand: 'Kenworth',
      model: 'T680',
      year: 2021,
      status: 'en_ruta',
    },
    {
      id: 3,
      plate: 'DEF-456',
      brand: 'Volvo',
      model: 'VNL 860',
      year: 2020,
      status: 'en_mantenimiento',
    },
    {
      id: 4,
      plate: 'GHI-101',
      brand: 'International',
      model: 'LT Series',
      year: 2023,
      status: 'disponible',
    },
  ];

  getStatusColor(
    status: TransportUnit['status']
  ): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'disponible':
        return 'primary';
      case 'en_ruta':
        return 'accent';
      case 'en_mantenimiento':
        return 'warn';
    }
  }
}
