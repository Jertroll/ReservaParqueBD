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
  public status: number = -1;
  public tours: TourSeleccionable[] = [];
  public reserva: Reserva = new Reserva(0, 0, '', 0, 0, []);
  public detalle: Detalle = new Detalle(0, 0, 0, '', '', 0, 0, 0, 0);
  public detallesReserva: Detalle[] = [];

  constructor(
    private tourService: TourService,
    private reservaService: ReservaService,
    private detalleService: DetalleService
  ) {}

  ngOnInit() {
    this.mostrarTours();
  }

  mostrarTours() {
    this.tourService.verTours().subscribe(
      (response) => {
        // Mapear la respuesta para agregar propiedades 'seleccionado' y 'fechaSeleccionada'
        this.tours = response.data.map((tour: Tour) => ({ ...tour, seleccionado: false }));
      },
      error => {
        console.error('Error cargando tours', error);
      }
    );
  }

  onTourSelectionChange(tour: TourSeleccionable, event: any) {
    tour.seleccionado = event.target.checked;
    if (tour.seleccionado) {
      if (!tour.fechaSeleccionada) {
        // Inicializar la fecha si no está configurada
        tour.fechaSeleccionada = new Date().toISOString().split('T')[0]; // Por defecto la fecha de hoy
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
  
    // Limpiar detallesReserva antes de llenarlos
    this.detallesReserva = [];
  
    // Agregar detalles de reserva para los tours seleccionados
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
      const detalle = new Detalle(0, 0, tour.idTour, fechaTour, '', 0, 0, 0, 0); // Ajusta según tus necesidades
      this.detallesReserva.push(detalle);
    });
  
    // Construir objeto de reserva para enviar al servicio
    const reserva = new Reserva(
      0, // idReserva (dejar en 0 si es autoincremental en el backend)
      reservaForm.value.idCliente,
      '', // Deberías asignar la fecha de reserva adecuada
      reservaForm.value.idEmpleado, // idEmpleado
      reservaForm.value.cantVisitantes, // cantVisitantes
      this.detallesReserva
    );
  
    // Console log para verificar la reserva antes de enviarla al servicio
    console.log('Reserva a enviar:', reserva);
  
    // Enviar la reserva al servicio
    this.reservaService.crear(reserva).subscribe(
      (response) => {
        console.log('Reserva exitosa:', response);
        // Guardar detalles de reserva si es necesario
        this.saveDetallesReserva(response.reserva.id); // Asumiendo que esto guarda los detalles de reserva
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
