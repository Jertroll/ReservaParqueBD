import { Detalle } from "./detalle"; 
export class Reserva {
  idReserva: number;
  idCliente: number;
  fechaReserva: string;
  detallesReserva: Detalle[];

  constructor(idReserva: number, idCliente: number, fechaReserva: string, detallesReserva: Detalle[]) {
    this.idReserva = idReserva;
    this.idCliente = idCliente;
    this.fechaReserva = fechaReserva;
    this.detallesReserva = detallesReserva;
  }
}
