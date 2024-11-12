import { Detalle } from "./detalle"; 
export interface Reserva {
  fechaInicio:string;
  fechaFinal: string;
}
export class Reserva {
  idReserva: number;
  idUsuario: number;
  fechaReserva: string;
  detallesReserva: Detalle[];

  constructor(idReserva: number, idUsuario: number, fechaReserva: string, detallesReserva: Detalle[]) {
    this.idReserva = idReserva;
    this.idUsuario = idUsuario;
    this.fechaReserva = fechaReserva;
    this.detallesReserva = detallesReserva;
  }
}
