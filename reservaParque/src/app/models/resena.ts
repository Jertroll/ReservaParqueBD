export class Resena {
    constructor(
      public idTour: number,
      public nombre: string,
      public idParque: number,
      public precio: number,
      public descripcion: string,
      public horaInicio: number,
      public duracion: number
    ) {}
  }