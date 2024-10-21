export class Usuario {
  constructor(
    public idUsuario: number,
    public cedula: number,
    public nombre: string,
    public correo: string,
    public contrasena: string,
    public telefono: number,
    public alergias: string
  ) {}
}
