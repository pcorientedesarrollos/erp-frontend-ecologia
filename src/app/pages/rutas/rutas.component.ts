import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// --- Interfaces para modelar nuestros datos ---
interface Operator {
  id: number;
  name: string;
}

interface Vehicle {
  id: string;
  name: string;
}

interface Client {
  id: number;
  name: string;
  address: string;
  city: string;
}

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent implements OnInit {
  private fb = inject(FormBuilder);

  // --- Propiedades del Formulario ---
  public routeForm: FormGroup;

  // --- Datos de prueba (eventualmente vendrán de una API) ---
  public operators: Operator[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana García' },
    { id: 3, name: 'Luis Hernández' },
  ];

  public vehicles: Vehicle[] = [
    { id: 'VAN-01', name: 'Ford Transit' },
    { id: 'VAN-02', name: 'Mercedes Sprinter' },
    { id: 'CAM-01', name: 'Nissan NP300' },
  ];

  public clients: Client[] = [
    { id: 101, name: 'Hotel Emporio', address: 'Calle 60 #451, Centro', city: 'Mérida' },
    { id: 102, name: 'Restaurante La Chaya Maya', address: 'Calle 55 #500, Centro', city: 'Mérida' },
    { id: 103, name: 'Oficinas de Gobierno', address: 'Av. Itzáes #234', city: 'Mérida' },
    { id: 104, name: 'Plaza Altabrisa', address: 'Calle 7 #451, Fracc. Altabrisa', city: 'Mérida' },
    { id: 105, name: 'Hospital Star Médica', address: 'Calle 26 #199, Fracc. Altabrisa', city: 'Mérida' },
    { id: 106, name: 'Super Aki Caucel', address: 'Av. 59 #722, Cd. Caucel', city: 'Mérida' },
    { id: 107, name: 'Bodega Aurrera Oriente', address: 'Calle 65, Kanasín', city: 'Kanasín' },
  ];

  // --- Propiedades de la Tabla ---
  public displayedColumns: string[] = ['select', 'name', 'address', 'city'];
  public dataSource = new MatTableDataSource<Client>(this.clients);
  public selection = new SelectionModel<Client>(true, []); // true para selección múltiple

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.routeForm = this.fb.group({
      operator: ['', Validators.required],
      vehicle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // --- Lógica de la Tabla de Selección ---

  /** Revisa si todos los clientes visibles están seleccionados. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, limpia la selección. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** Etiqueta para la casilla de verificación de accesibilidad. */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  // --- Lógica Principal del Componente ---

  /** Filtra los datos de la tabla de clientes. */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Guarda la ruta creada. */
  saveRoute() {
    if (this.routeForm.invalid) {
      alert('Por favor, seleccione un operador y un vehículo.');
      return;
    }
    if (this.selection.selected.length === 0) {
      alert('Por favor, seleccione al menos un cliente para la ruta.');
      return;
    }

    const newRoute = {
      operator: this.routeForm.value.operator,
      vehicle: this.routeForm.value.vehicle,
      clients: this.selection.selected.map(client => client.id), // Guardamos solo los IDs
      creationDate: new Date()
    };

    console.log('Ruta Creada:', newRoute);
    alert(`Ruta para ${newRoute.operator.name} creada con ${newRoute.clients.length} paradas.`);
    
    // Aquí es donde llamarías a tu servicio para guardar en la base de datos
    // this.routeService.create(newRoute).subscribe(...)

    // Opcional: Limpiar el formulario y la selección después de guardar
    this.routeForm.reset();
    this.selection.clear();
  }
}