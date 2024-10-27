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
import { Empleado } from '../../../models/Empleado';
import { EmpleadoService } from '../../../services/empleado.service';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../models/factura';
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
export class ReservarComponent {
  public status: number = -1;
  public tours: TourSeleccionable[] = [];
  public reserva: Reserva = new Reserva(0, 0, '', []);
  public detallesReserva: Detalle[] = [];
  public empleados: Empleado[] = [];
  public factura: Factura = new Factura(0,0,'',0,0,0,0);
  public mostrarInfoFactura: boolean = false;
  public facturaId: number=0 ;
  constructor(
    private tourService: TourService,
    private reservaService: ReservaService,
    private detalleService: DetalleService,
    private empleadoService: EmpleadoService,
    private facturaService: FacturaService
  ) {}

  ngOnInit() {
    this.mostrarEmpleados();
    this.mostrarTours();
  }

  mostrarEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(
      (response) => {
        this.empleados = response.data.filter((empleado: Empleado) => empleado.roll === 'guia')
           .map((empleado: Empleado)=>({ ...empleado, seleccionado: false }));
      },
      error => {
        console.error('Error cargando empleados', error);
      }
    );
  }

  mostrarTours() {
    this.tourService.verTours().subscribe(
      (response) => {
        this.tours = response.tours;
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
        tour.fechaSeleccionada = new Date().toISOString().split('T')[0]; // Por defecto la fecha de hoy
      }
      tour.empleadoSeleccionado = 0;
      tour.cantVisitantes = 0;

      this.detallesReserva.push(new Detalle(0, 0, tour.idTour, tour.fechaSeleccionada, '', tour.empleadoSeleccionado ?? 0, tour.cantVisitantes, 0, 0));
    } else {
      this.detallesReserva = this.detallesReserva.filter(det => det.tour !== tour.idTour);
    }
  }

  onSubmit(reservaForm: any) {
    const toursSeleccionados = this.tours.filter(tour => tour.seleccionado);
    if (toursSeleccionados.length === 0) {
      console.log('No se han seleccionado tours');
      return;
    }
  
    this.detallesReserva = [];
  
    toursSeleccionados.forEach(tour => {
      let fechaTour: string = '';
      if (tour.fechaSeleccionada) {
        const date = new Date(tour.fechaSeleccionada);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        fechaTour = `${year}-${month}-${day}`;  // Formato YYYY-MM-DD
      }
  
      // Validar cantVisitantes
      if (tour.cantVisitantes === undefined || tour.cantVisitantes < 1) {
        console.error('El campo cantVisitantes es inválido para el tour:', tour.idTour);
        return;
      }
  
      const empleadoId = tour.empleadoSeleccionado;
      if (empleadoId === undefined) {
        console.error('El campo empleadoSeleccionado es inválido para el tour:', tour.idTour);
        return;
      }
  
      const detalle = new Detalle(0, 0, tour.idTour, fechaTour,"", empleadoId, tour.cantVisitantes, 0, 0);
      this.detallesReserva.push(detalle);
    });
  
    const reserva = new Reserva(
      0, // No es necesario enviar idReserva desde el frontend
      reservaForm.value.idCliente,
      new Date().toISOString().split('T')[0],
      this.detallesReserva
    );
    console.log('Datos de reserva a enviar:', reserva);
    this.reservaService.crear(reserva).subscribe(
      (response) => {
        console.log('Reserva exitosa:', response);
        this.saveDetallesReserva(response.reserva.id);
         const reservaId = response.reserva.idReserva;
        this.createFactura(reservaId);
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
      this.detalleService.crear(detalle).subscribe(
        (response) => {
          console.log('Detalle creado:', response);
        },
        (error: Error) => {
          console.error('Error creando detalle:', error);
        }
      );
    });
  }
  createFactura(reservaId: number) {
    const fechaEmision = new Date().toISOString().split('T')[0]
    this.facturaService.crear(reservaId,fechaEmision).subscribe(
      (response) => {
        console.log('Factura creada:', response);
        const facturaId = response.factura.idFactura; // Asume que la respuesta contiene el ID de la factura
        this.mostrarFactura(facturaId);
      },
      (error) => {
        console.error('Error creando factura:', error);
      }
    );
  }
  mostrarFactura(facturaId: number){
    this.facturaService.mostrarFactura(facturaId).subscribe(
      (response) => {
        this.factura = response;
        console.log('Factura obtenida:', this.factura);
        this.mostrarInfoFactura = true; 
        // Aquí puedes agregar la lógica para mostrar la factura en la interfaz de usuario
      },
      (error) => {
        console.error('Error obteniendo factura:', error);
      }
    );
  }

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
