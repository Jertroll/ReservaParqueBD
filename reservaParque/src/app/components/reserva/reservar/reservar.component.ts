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
      tour.empleadoSeleccionado = tour.empleadoSeleccionado ?? 0; // Asegura un valor predeterminado
      tour.cantVisitantes = tour.cantVisitantes ?? 1; // Asegura al menos 1 visitante
      
      // Crea un nuevo detalle con valores seguros y válidos
      this.detallesReserva.push(new Detalle(
        0, 
        tour.idTour, 
        tour.fechaSeleccionada, 
        '', 
        tour.empleadoSeleccionado, 
        tour.cantVisitantes, 
        0, 
        0, 
        0
      ));
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
  
    // Crear los detalles de la reserva a partir de los tours seleccionados
    this.detallesReserva = toursSeleccionados.map(tour => {
      const fechaTour = tour.fechaSeleccionada || new Date().toISOString().split('T')[0];
      return new Detalle(
        0,
        tour.idTour,
        fechaTour,
        '',
        tour.empleadoSeleccionado ?? 0,
        tour.cantVisitantes ?? 1,
        0,
        0,
        0
      );
    });
  
    if (this.detallesReserva.length === 0) {
      console.error('No se han agregado detalles de reserva válidos');
      return;
    }
  
    // Crear la reserva con el usuario y detalles válidos
    const reserva = new Reserva(
      0,
      idUsuario,
      new Date().toISOString().split('T')[0],
      this.detallesReserva
    );
  
    console.log('Reserva a enviar:', reserva);
  
    this.reservaService.crear(reserva).subscribe(
      (response) => {
        console.log('Reserva exitosa:', response);
        const idReserva = response.reserva.idReserva;
        this.saveDetallesReserva(idReserva, this.detallesReserva); // Envía todos los detalles juntos
        this.createFactura(idReserva);
        this.mostrarFactura
        // Limpia el formulario después de enviar
        reservaForm.reset();
        this.detallesReserva = [];
        this.tours.forEach(tour => tour.seleccionado = false);
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }

    saveDetallesReserva(idReserva: number, detallesReserva: Detalle[]): void {
      detallesReserva.forEach(detalle => {
        detalle.idReserva = idReserva;
        this.detalleService.crear(detalle).subscribe({
          next: (response) => {
            console.log('Detalle de reserva creado:', response);
          },
          error: (error) => {
            console.error('Error creando detalle de reserva:', error);
          }
        });
      });
    }
    
  

  createFactura(reservaId: number) {
    this.facturaService.crear(reservaId).pipe(
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
