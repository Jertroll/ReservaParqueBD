import { Detalle } from "./detalle"; 
export class Reserva {
    constructor(
      public idReserva: number,
      public idCliente: number,
      public fechaReserva: number,
      public idEmpleado: number,
      public cantVisitantes: number,
      public detallesReserva: Detalle[] = []
    ) {}
  }