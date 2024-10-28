export class Tour {
    constructor(
      public idTour: number,
      public nombre: string,
      public idParque: number,
      public precio: number,
      public descripcion: string,
      public horaInicio: string,
      public duracion: number,
      public imagen:string,
      public nombreParque?: string
    ) {}
  }