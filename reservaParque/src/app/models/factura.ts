export class Factura {
    constructor(
      public idFactura: number,
      public idReserva: number,
      public fechaEmision: string,
      public subTotal: number,
      public descuento: number,
      public impuesto: number,
      public total: number
    ) {}
  }
  