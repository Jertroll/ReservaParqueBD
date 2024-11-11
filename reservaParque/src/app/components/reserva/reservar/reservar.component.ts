import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tour } from '../../../models/tour';
import { TourService } from '../../../services/tour.service';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { Detalle } from '../../../models/detalle';
import { DetalleService } from '../../../services/detalle.service';
import { Empleado } from '../../../models/Empleado';
import { EmpleadoService } from '../../../services/empleado.service';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../models/factura';
import { server } from '../../../services/global';
import { LoginService } from '../../../services/login.service';

interface TourSeleccionable extends Tour {
  seleccionado?: boolean;
  fechaSeleccionada?: string;
  empleadoSeleccionado?: number;
  cantVisitantes?: number;
}

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  public status: number = -1;
  public tours: TourSeleccionable[] = [];
  public reserva: Reserva = new Reserva(0, 0, '', []);
  public detallesReserva: Detalle[] = [];
  public empleados: Empleado[] = [];
  public factura: Factura = new Factura(0,0,'',0,0,0,0);
  public mostrarInfoFactura: boolean = false;
  public facturaId: number = 0;
  public url: string;

  constructor(
    private tourService: TourService,
    private reservaService: ReservaService,
    private detalleService: DetalleService,
    private empleadoService: EmpleadoService,
    private facturaService: FacturaService,
    private loginService: LoginService
  ) {
    this.url = server.url;
  }

  ngOnInit() {
    this.mostrarEmpleados();
    this.mostrarTours();
  }

  mostrarEmpleados() {
    this.empleadoService.obtenerEmpleados().pipe(
      catchError(error => {
        console.error('Error cargando empleados', error);
        return of({ status: 500, message: 'Error', data: [] }); // Retorna un objeto con `data` vacío si ocurre un error
      })
    ).subscribe(
      (response) => {
        if ('data' in response) {
          this.empleados = response.data.filter((empleado: Empleado) => empleado.rol === 'guia');
        } else {
          this.empleados = [];
        }
      }
    );
  }
  

  mostrarTours() {
    this.tourService.verTours().pipe(
      catchError(error => {
        console.error('Error cargando tours', error);
        return of({ tours: [] });
      })
    ).subscribe(
      (response) => {
        const toursResponse = response as { tours: Tour[] };
        this.tours = toursResponse.tours;
      }
    );
  }
  

  onTourSelectionChange(tour: TourSeleccionable, event: any) {
    tour.seleccionado = event.target.checked;
    if (tour.seleccionado) {
      tour.fechaSeleccionada = tour.fechaSeleccionada || new Date().toISOString().split('T')[0];
      tour.empleadoSeleccionado = 0;
      tour.cantVisitantes = 0;

      this.detallesReserva.push(new Detalle(0, tour.idTour, tour.fechaSeleccionada, '', tour.empleadoSeleccionado ?? 0, tour.cantVisitantes, 0, 0, 0));
    } else {
      this.detallesReserva = this.detallesReserva.filter(det => det.tour !== tour.idTour);
    }
  }

  onSubmit(reservaForm: any) {
    const idUsuario = this.loginService.getUserId();
    if (idUsuario === null) {
        console.error('ID de usuario no encontrado');
        return;
    }

    const toursSeleccionados = this.tours.filter(tour => tour.seleccionado);
    if (toursSeleccionados.length === 0) {
        console.log('No se han seleccionado tours');
        return;
    }

    this.detallesReserva = [];

    toursSeleccionados.forEach(tour => {
        const fechaTour = tour.fechaSeleccionada ? new Date(tour.fechaSeleccionada).toISOString().split('T')[0] : '';
        if (!tour.cantVisitantes || tour.cantVisitantes < 1) {
            console.error('El campo cantVisitantes es inválido para el tour:', tour.idTour);
            return;
        }

        if (tour.empleadoSeleccionado === undefined) {
            console.error('El campo empleadoSeleccionado es inválido para el tour:', tour.idTour);
            return;
        }

        const detalle = new Detalle(0, tour.idTour, fechaTour, "", tour.empleadoSeleccionado, tour.cantVisitantes, 0, 0, 0);
        this.detallesReserva.push(detalle);
    });

    // Crear el objeto de reserva con idReserva en 0
    const reserva = new Reserva(
        0,  // No se debe pasar idReserva
        idUsuario,
        new Date().toISOString().split('T')[0],
        this.detallesReserva
    );

    console.log('Datos de reserva a enviar:', reserva);
    this.reservaService.crear(reserva).subscribe(
        (response) => {
            console.log('Reserva exitosa:', response);
            const idReserva = response.reserva.idReserva; // Extraer el idReserva del response
            this.saveDetallesReserva(idReserva); // Pasar el idReserva a la función
            this.createFactura(idReserva); // Crear factura usando el idReserva
            reservaForm.reset();
            this.tours.forEach(tour => tour.seleccionado = false);
            this.changeStatus(0);
        },
        error => {
            console.error('Error al hacer la reserva:', error);
            this.changeStatus(2);
        }
    );
}



  saveDetallesReserva(reservaId: number) {
    this.detallesReserva.forEach(detalle => {
      detalle.idReserva = reservaId;
      this.detalleService.crear(detalle).pipe(
        catchError(error => {
          console.error('Error creando detalle:', error);
          return of(null);
        })
      ).subscribe(
        (response) => {
          console.log('Detalle creado:', response);
        }
      );
    });
  }

  createFactura(reservaId: number) {
    const fechaEmision = new Date().toISOString().split('T')[0];
    this.facturaService.crear(reservaId, fechaEmision).pipe(
      catchError(error => {
        console.error('Error creando factura:', error);
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response?.factura?.idFactura) {
          console.log('Factura creada:', response);
          this.mostrarFactura(response.factura.idFactura);
        }
      }
    );
  }

  mostrarFactura(facturaId: number) {
    this.facturaService.mostrarFactura(facturaId).pipe(
      catchError(error => {
        console.error('Error obteniendo factura:', error);
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          this.factura = response;
          this.mostrarInfoFactura = true;
          console.log('Factura obtenida:', this.factura);
        }
      }
    );
  }

  changeStatus(st: number) {
    this.status = st;
    timer(5000).subscribe(() => this.status = -1);
  }
}
