export class Detalle {
    constructor(
      public idDetalleReserva: number,
      public idReserva: number,
      public tour: number,
      public fechaTour: string,
      public horaTour: string,
      public idEmpleado: number,
      public cantVisitantes: number,
      public precioUnitario: number,
      public subTotal: number
    ) {}
  }