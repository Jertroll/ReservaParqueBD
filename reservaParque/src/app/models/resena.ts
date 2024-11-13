export class Resena {
    constructor(
      public idResena: number,
      public idUsuario: number,
      public idParque: number,
      public comentario: string,
      public calificacion: number,
      public fechaResena: string
    ) {}
  }