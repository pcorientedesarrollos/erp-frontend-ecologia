// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate que RouterModule está importado

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // La única importación necesaria es RouterModule
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'erp-frontend-ecologia';
}
