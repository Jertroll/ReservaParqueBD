import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { Detalle } from '../../../models/detalle';
import { DetalleService } from '../../../services/detalle.service';
import { server } from '../../../services/global';

@Component({
  selector: 'app-mostrar-reserva',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, FormsModule],
  templateUrl: './mostrar-reserva.component.html',
  styleUrls: ['./mostrar-reserva.component.css'] // Corregido a "styleUrls"
})
export class MostrarReservaComponent implements OnInit {
  public reserva: Reserva = new Reserva(0, 0, '', []);
  public detallesReserva: Detalle[] = [];
  public url: string;
  public fechaInicio: string = '';
  public fechaFinal: string = '';
  public reservas: any[] = [];           // Reservas filtradas por fecha
  public isSearched: boolean = false;     // Indicador de búsqueda de reservas por fecha
  public mostrarDetalles: boolean = false; // Propiedad para controlar visibilidad de detalles

  constructor(
    private reservaService: ReservaService,
    private detalleService: DetalleService,
  ) {
    this.url = server.url;
  }

  ngOnInit(): void {
    this.obtenerReservas();  // Cargar todas las reservas al iniciar
  }

  mostrarDetallesReservas(): void {
    this.obtenerReservas();  // Llama a tu función obtenerReservas()
    this.mostrarDetalles = true; // Muestra la tabla después de cargar los datos
  }

  obtenerReservas(): void {
    this.reservaService.getReservasUsuarios().subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.detallesReserva = data.data;  // Guardamos todas las reservas de usuarios
          console.log(this.detallesReserva);
        } else {
          console.error(data.message);
        }
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  obtenerReservasPorFecha(): void {
    this.isSearched = true; // Indicamos que se ha realizado la búsqueda

    // Validación de fechas
    if (this.fechaInicio && this.fechaFinal) {
      if (new Date(this.fechaInicio) <= new Date(this.fechaFinal)) {
        this.reservaService.getReservasPorFecha(this.fechaInicio, this.fechaFinal).subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.reservas = data.data;  // Guardamos las reservas filtradas por fecha
              console.log(this.reservas); // Para verificar qué datos estamos recibiendo
            } else {
              this.reservas = [];  // Si no hay reservas, el array queda vacío
              console.error(data.message);
            }
          },
          (error) => {
            this.reservas = [];  // Si ocurre un error, se vacía el array de reservas
            console.error('Error al obtener las reservas:', error);
          }
        );
      } else {
        console.error('La fecha de inicio debe ser menor o igual a la fecha de finalización.');
      }
    } else {
      console.error('Por favor ingrese ambas fechas');
    }
  }
}
