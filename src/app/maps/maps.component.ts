import { Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

// --- Interfaces para hacer el código más seguro y fácil de leer ---

// Define la estructura para una ruta en el mapa
export interface MapRoute {
  path: google.maps.LatLngLiteral[];
  options: google.maps.PolylineOptions;
}

// Define la estructura para un marcador (ej. un vehículo, un punto de interés)
export interface MapMarker {
  position: google.maps.LatLngLiteral;
  options?: google.maps.MarkerOptions;
}


@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    GoogleMapsModule // Importamos el módulo de mapas aquí
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {

  // --- ENTRADAS (Inputs) ---
  // Propiedades que el componente recibe desde fuera para ser reutilizable.

  @Input() routes: MapRoute[] = [];
  @Input() markers: MapMarker[] = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 20.9754, lng: -89.6169 }; // Centro por defecto: Mérida
  @Input() zoom = 12;

  // --- CONFIGURACIÓN ---
  // Opciones visuales del mapa.
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 8,
    streetViewControl: false,      // Oculta el hombrecito de Street View
    mapTypeControl: false,       // Oculta los botones de Mapa/Satélite
    fullscreenControl: false,    // Oculta el botón de pantalla completa
  };

}