export class Empleado {
    constructor(
      public idEmpleado: number,
      public cedula: string,
      public nombre: string,
      public apellido:string,
      public correo: string,
      public contrasena: string,
      public telefono: string,
      public fechaIngreso: string,
      public rol: string
    ) {}
  }
  