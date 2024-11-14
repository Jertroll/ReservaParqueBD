import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { DetalleService } from '../../../services/detalle.service';
import { Detalle } from '../../../models/detalle';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vis-reservas',
  standalone: true, // Declaración standalone
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './visReservas.component.html',
  styleUrls: ['./visReservas.component.css']
})
export class VisReservasComponent implements OnInit {
  detallesReserva: Detalle[] = [];
  isGuide: boolean = false;
  idEmpleado: number | null = null;

  constructor(
    private detalleService: DetalleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const identity = sessionStorage.getItem('identity');
    
    if (identity) {
      const user = JSON.parse(identity);
      this.isGuide = user.role === 'Guia' && user.type !== 'usuario';
  
      if (this.isGuide) {
        // Asigna user.user_id en lugar de user.idEmpleado
        this.idEmpleado = user.user_id;
  
        if (this.idEmpleado) {
          this.cargarDetalles();
        } else {
          console.error('Error: user_id no está definido en el objeto de usuario.');
        }
      } else {
        console.warn('El usuario no es un guía. No se cargarán las reservas.');
      }
    }
  }
  

  cargarDetalles(): void {
    if (this.idEmpleado !== null) {
      this.detalleService.verDetallesEmpleado(this.idEmpleado).subscribe(
        (response) => {
          if (response.status === 200) {
            this.detallesReserva = response.data;
          } else {
            console.error('Error al obtener detalles de reservas:', response.message);
          }
        },
        (error) => {
          console.error('Error al cargar detalles de reservas:', error);
        }
      );
    }
  }

  regresar() {
    this.location.back();
  }
}
