export class Detalle {
  idDetalleReserva: number;
  idReserva: number;
  tour: number;
  fechaTour: string;
  horaTour: string;
  idEmpleado: number;
  cantVisitantes: number;
  precioUnitario: number;
  subTotal: number;

  constructor(idDetalleReserva: number, idReserva: number, tour: number, fechaTour: string, horaTour: string, idEmpleado: number, cantVisitantes: number, precioUnitario: number, subTotal: number) {
    this.idDetalleReserva = idDetalleReserva;
    this.idReserva = idReserva;
    this.tour = tour;
    this.fechaTour = fechaTour;
    this.horaTour = horaTour;
    this.idEmpleado = idEmpleado;
    this.cantVisitantes = cantVisitantes;
    this.precioUnitario = precioUnitario;
    this.subTotal = subTotal;
  }
}