import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { Tour } from '../../../models/tour';
import { TourService } from '../../../services/tour.service';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { Detalle } from '../../../models/detalle';
import { DetalleService } from '../../../services/detalle.service';

interface TourSeleccionable extends Tour {
  seleccionado?: boolean;
  fechaSeleccionada?: string;
}

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent {
  public status: number;
  tours: TourSeleccionable[];
  public reserva: Reserva;
  public detalle: Detalle;
  detallesReserva: Detalle[];

  constructor(
    private tourService: TourService,
    private reservaService: ReservaService,
    private detalleService: DetalleService
  ) {
    this.status = -1;
    this.tours = [];
    this.detallesReserva = [];
    this.reserva = new Reserva(0, 0, 0, 0, 0, []);
    this.detalle = new Detalle(0, 0, 0, '', '', 0, 0, 0, 0);
  }

  ngOnInit() {
    this.mostrarTours();
  }

  mostrarTours() {
    this.tourService.verTours().subscribe(
      (response) => {
        // Map the response to add 'seleccionado' and 'fechaSeleccionada' properties
        this.tours = response.data.map((tour: Tour) => ({ ...tour, seleccionado: false }));
      },
      error => {
        console.error('Error loading tours', error);
      }
    );
  }

  onTourSelectionChange(tour: TourSeleccionable, event: any) {
    tour.seleccionado = event.target.checked;
    if (tour.seleccionado) {
      if (!tour.fechaSeleccionada) {
        // Initialize the date if not already set
        tour.fechaSeleccionada = new Date().toISOString().split('T')[0]; // Default to today's date
      }
      this.detallesReserva.push(new Detalle(0, 0, tour.idTour, tour.fechaSeleccionada, '', 0, 0, 0, 0));
    } else {
      this.detallesReserva = this.detallesReserva.filter(det => det.tour !== tour.idTour);
    }
  }

  onSubmit(reservaForm: any) {
    // Verificar si hay al menos un tour seleccionado
    const toursSeleccionados = this.tours.filter(tour => tour.seleccionado);
    if (toursSeleccionados.length === 0) {
      console.log('No se han seleccionado tours');
      return;
    }

    // Limpiar detallesReserva antes de rellenar
    this.detallesReserva = [];

    // Agregar los detalles de reserva para los tours seleccionados
    toursSeleccionados.forEach(tour => {
      let fechaTour: string = ''; // Valor por defecto
      if (tour.fechaSeleccionada) {
        // Formatear la fecha al formato DD/MM/YYYY
        const date = new Date(tour.fechaSeleccionada);
        const day = ('0' + date.getDate()).slice(-2); // Agrega un cero inicial si es necesario
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agrega un cero inicial si es necesario
        const year = date.getFullYear();
        fechaTour = `${day}/${month}/${year}`;
      }
      const detalle = new Detalle(
        0, // idDetalleReserva (dejar en 0 si es autoincremental)
        0, // idReserva (se asignará después)
        tour.idTour, // tour
        fechaTour, // fechaTour
        '', // horaTour (aquí deberías asignar la hora correcta)
        this.detalle.idEmpleado, // idEmpleado
        this.detalle.cantVisitantes, // cantVisitantes
        0, // precioUnitario (deberías asignar el precio correcto)
        0 // subTotal (deberías calcular el subtotal correcto)
      );
      this.detallesReserva.push(detalle);
    });

    // Agregar los datos del empleado y la cantidad de visitantes a la reserva
    this.reserva.idCliente = reservaForm.value.idCliente;
    this.reserva.idEmpleado = this.detalle.idEmpleado;
    this.reserva.cantVisitantes = this.detalle.cantVisitantes;
    this.reserva.detallesReserva = this.detallesReserva;

    // Enviar la reserva al servicio
    this.reservaService.crear(this.reserva).subscribe(
      (response) => {
        console.log('Reserva exitosa:', response);
        this.saveDetallesReserva(response.reserva.id);
        // Reiniciar el formulario y limpiar la selección de tours
        reservaForm.reset();
        this.tours.forEach(tour => tour.seleccionado = false);
        // Actualizar el estado para mostrar un mensaje de éxito
        this.changeStatus(0);
      },
      error => {
        console.error('Error al hacer la reserva:', error);
        // Actualizar el estado para mostrar un mensaje de error
        this.changeStatus(2);
      }
    );
  }

  saveDetallesReserva(reservaId: number) {
    this.detallesReserva.forEach(detalle => {
      detalle.idReserva = reservaId;
      this.detalleService.crear(detalle).subscribe({
        next: (response) => {
          console.log('Detalle creado:', response);
        },
        error: (error: Error) => {
          console.error('Error creando detalle:', error);
        }
      });
    });
  }

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
