import { Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

// Interfaces para definir la estructura de los datos del mapa
export interface MapRoute {
  path: google.maps.LatLngLiteral[];
  options: google.maps.PolylineOptions;
}

export interface MapMarker {
  position: google.maps.LatLngLiteral;
  options?: google.maps.MarkerOptions;
}

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  // Inputs para recibir datos desde el componente padre
  @Input() routes: MapRoute[] = [];
  @Input() markers: MapMarker[] = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 20.9754, lng: -89.6169 };
  @Input() zoom = 12;

  // Opciones de configuración visual del mapa
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 8,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };
}