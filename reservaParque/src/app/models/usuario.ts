export class Usuario {
  constructor(
    public idUsuario: number,
    public cedula: string,
    public nombre: string,
    public correo: string,
    public contrasena: string,
    public telefono: string,
    public alergias: string
  ) {}
}
