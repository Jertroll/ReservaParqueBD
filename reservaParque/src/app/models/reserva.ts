import { Detalle } from "./detalle"; 
export class Reserva {
  idReserva: number;
  idCliente: number;
  fechaReserva: string;
  idEmpleado: number;
  cantVisitantes: number;
  detallesReserva: Detalle[];

  constructor(idReserva: number, idCliente: number, fechaReserva: string, idEmpleado: number, cantVisitantes: number, detallesReserva: Detalle[]) {
    this.idReserva = idReserva;
    this.idCliente = idCliente;
    this.fechaReserva = fechaReserva;
    this.idEmpleado = idEmpleado;
    this.cantVisitantes = cantVisitantes;
    this.detallesReserva = detallesReserva;
  }
}
