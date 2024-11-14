import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { Reserva } from '../../../models/reserva';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importa Location

@Component({
  selector: 'app-vis-reservas',
  templateUrl: './visReservas.component.html',
  styleUrls: ['./visReservas.component.css']
})
export class VisReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private location: Location // Inyecta Location
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  // Cargar las reservas utilizando el servicio
  cargarReservas() {
    this.reservaService.obtenerReservas().subscribe(
      response => {
        if (response.status === 200) {
          this.reservas = response.data; // Accede a 'data' que contiene el array de reservas
        } else {
          console.error('Error al obtener las reservas:', response.message);
        }
      },
      error => {
        console.error('Error al cargar reservas:', error);
      }
    );
  }

  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}

