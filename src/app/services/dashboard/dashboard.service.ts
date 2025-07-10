import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
// Para la URL del API

// Define una interfaz para la data que esperas. ¡La tipificación es clave!
export interface DashboardCard {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`; // ej: http://localhost:3000/api/dashboard

  constructor(private http: HttpClient) {}

  // Este método obtendrá los datos del backend
  getDashboardData(): Observable<DashboardCard[]> {
    return this.http.get<DashboardCard[]>(this.apiUrl);
  }
}
