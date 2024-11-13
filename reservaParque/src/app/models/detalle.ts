export interface Detalle {
  NombreUsuario: string;
  fechaReserva: Date;
  NombreTour: string;
  duracion:number;
}

export class Detalle {
  idDetalleReserva: number;
  tour: number;
  fechaTour: string;
  horaTour: string;
  idEmpleado: number;
  cantVisitantes: number;
  precioUnitario: number;
  subTotal: number;
  idReserva: number;

  constructor(idDetalleReserva: number,tour: number, fechaTour: string, horaTour: string, idEmpleado: number, cantVisitantes: number, precioUnitario: number, subTotal: number,idReserva: number, ) {
    this.idDetalleReserva = idDetalleReserva;
    this.tour = tour;
    this.fechaTour = fechaTour;
    this.horaTour = horaTour;
    this.idEmpleado = idEmpleado;
    this.cantVisitantes = cantVisitantes;
    this.precioUnitario = precioUnitario;
    this.subTotal = subTotal;
    this.idReserva = idReserva;
  }
}