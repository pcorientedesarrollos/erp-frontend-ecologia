import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

// --- Interfaces para modelar nuestros datos ---
interface SelectOption { id: number | string; name: string; }
interface Client { id: number; name: string; address: string; }

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule, MatTableModule, MatCardModule
  ],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css' // Usaremos el mismo CSS
})
export class RutasComponent implements OnInit {
  private fb = inject(FormBuilder);

  // --- Formularios ---
  public routeMasterForm: FormGroup;
  public stopDetailForm: FormGroup;

  // --- Datos de prueba (reemplazar con llamadas a servicios) ---
  public operators: SelectOption[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana García' },
  ];
  public vehicles: SelectOption[] = [
    { id: 'VAN-01', name: 'Ford Transit' },
    { id: 'VAN-02', name: 'Mercedes Sprinter' },
  ];
  public clients: Client[] = [
    { id: 101, name: 'Hotel Emporio', address: 'Calle 60 #451, Centro' },
    { id: 102, name: 'Restaurante La Chaya Maya', address: 'Calle 55 #500' },
    { id: 103, name: 'Plaza Altabrisa', address: 'Calle 7 #451, Fracc. Altabrisa' },
  ];
  public serviceTypes: SelectOption[] = [
    { id: 'fumigacion', name: 'Fumigación General' },
    { id: 'desratizacion', name: 'Control de Roedores' },
    { id: 'revision', name: 'Revisión de Estaciones' },
  ];

  // --- Tabla de Detalles ---
  public displayedColumns: string[] = ['client', 'address', 'serviceType', 'notes', 'actions'];

  constructor() {
    // Formulario para los detalles de una parada (cliente)
    this.stopDetailForm = this.fb.group({
      client: [null, Validators.required],
      serviceType: [null, Validators.required],
      notes: ['']
    });

    // Formulario principal que contiene la ruta completa
    this.routeMasterForm = this.fb.group({
      operator: [null, Validators.required],
      vehicle: [null, Validators.required],
      routeDate: [new Date(), Validators.required],
      stops: this.fb.array([]) // Aquí guardaremos las paradas (clientes) agregadas
    });
  }

  ngOnInit(): void { }

  // --- Getters para facilitar el acceso en el template ---
  get stops(): FormArray {
    return this.routeMasterForm.get('stops') as FormArray;
  }

  // --- Lógica de Negocio ---
  addStop(): void {
    if (this.stopDetailForm.invalid) {
      alert('Por favor, seleccione un cliente y un tipo de servicio.');
      return;
    }

    const clientData = this.stopDetailForm.get('client')?.value;

    const newStopData = {
      client: clientData,
      address: clientData.address, // Añadimos la dirección para mostrarla en la tabla
      serviceType: this.stopDetailForm.get('serviceType')?.value,
      notes: this.stopDetailForm.get('notes')?.value
    };

    this.stops.push(this.fb.group(newStopData));
    this.stopDetailForm.reset();
  }

  removeStop(index: number): void {
    this.stops.removeAt(index);
  }

  saveRoute(): void {
    if (this.routeMasterForm.invalid || this.stops.length === 0) {
      alert('Formulario inválido o sin paradas. Por favor, revise los campos.');
      return;
    }

    // Mapeamos los datos para guardar solo los IDs, no los objetos completos
    const finalRouteData = {
      operatorId: this.routeMasterForm.value.operator.id,
      vehicleId: this.routeMasterForm.value.vehicle.id,
      routeDate: this.routeMasterForm.value.routeDate,
      stops: this.routeMasterForm.value.stops.map((stop: any) => ({
        clientId: stop.client.id,
        serviceTypeId: stop.serviceType.id,
        notes: stop.notes
      }))
    };

    console.log('Guardando Ruta:', finalRouteData);
    alert(`Ruta para ${this.routeMasterForm.value.operator.name} guardada con ${finalRouteData.stops.length} paradas.`);
    
    this.cancel();
  }

  cancel(): void {
     this.routeMasterForm.reset({ routeDate: new Date() });
     this.stops.clear();
     this.stopDetailForm.reset();
  }
}