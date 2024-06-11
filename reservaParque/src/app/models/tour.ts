export class Tour {
    constructor(
      public idTour: number,
      public fecha: number,
      public idParque: number,
      public precio: number,
      public descripcion: string,
      public horaInicio: number,
      public duracion: number
    ) {}
  }