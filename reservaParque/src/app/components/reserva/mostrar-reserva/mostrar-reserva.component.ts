import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common'; // Asegura importar CommonModule para los pipes
import { FormsModule } from '@angular/forms';  // Importar FormsModule
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
  styleUrl: './mostrar-reserva.component.css'
})
export class MostrarReservaComponent {
  public reserva: Reserva = new Reserva(0, 0, '', []);
  public detallesReserva: Detalle[] = [];
  public url: string;
  public fechaInicio: string = '';
  public fechaFinal: string = '';
  public reservas: any[] = [];
  public isSearched: boolean = false; // Indicador de búsqueda de reservas por fecha
  public mostrarTodasLasReservas: boolean = false; // Nueva propiedad para controlar la visualización de la tabla

  constructor(
    private reservaService: ReservaService,
    private detalleService: DetalleService,
  ) {
    this.url = server.url;
  }

  ngOnInit(): void {
    this.obtenerReservas(); // Llamamos a esta función para cargar las reservas de usuarios si es necesario
  }

  obtenerReservas() {
    this.reservaService.getReservasUsuarios().subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.detallesReserva = data.data;
          console.log(this.detallesReserva)
        } else {
          console.error(data.message);
        }
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  obtenerReservasPorFecha() {
    this.isSearched = true; // Indicamos que se ha realizado la búsqueda
  
    if (this.fechaInicio && this.fechaFinal) {
      this.reservaService.getReservasPorFecha(this.fechaInicio, this.fechaFinal).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.reservas = data.data;  // Guardamos las reservas recibidas
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
      console.error('Por favor ingrese ambas fechas');
    }
  }

  // Método para controlar cuándo mostrar todas las reservas de los usuarios
  toggleMostrarTodasLasReservas() {
    this.mostrarTodasLasReservas = !this.mostrarTodasLasReservas;
  }
}
