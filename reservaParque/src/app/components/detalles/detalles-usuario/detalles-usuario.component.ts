import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { DetalleService } from '../../../services/detalle.service';
import { server } from '../../../services/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-usuario.component.html',
  styleUrl: './detalles-usuario.component.css'
})
export class DetallesUsuarioComponent implements OnInit {
  public idUsuario: number = 0;
  public url: string;
  detalles: any[] = [];
  mensaje: string = '';
  constructor(
    private detalleService: DetalleService,
    private loginService: LoginService
  ) {
    this.url = server.url;
  }
  ngOnInit(): void {
    this.obtenerReservasUsuario();
  }
  obtenerReservasUsuario(): void {
    const idUsuario = this.loginService.getUserId();  // Obtener el ID del usuario desde el LoginService

    if (idUsuario) {  // Verificar si existe el idUsuario antes de continuar
      this.detalleService.getReservasUsuario(idUsuario).subscribe(
        (response) => {
          if (response.status === 200) {
            this.detalles = response.data;  // Asignar los detalles recibidos
            this.mensaje = response.message;
          } else {
            this.mensaje = response.message;  // Mostrar mensaje de error si el estado no es 200
          }
        },
        (error) => {
          this.mensaje = 'Error al obtener los detalles de reservas';
          console.error(error);
        }
      );
    } else {
      this.mensaje = 'Usuario no autenticado';  // Mensaje de error si no hay usuario autenticado
    }
  }
}
