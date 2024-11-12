import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../../models/usuario'; 
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../services/usuario.service'; 

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  usuario: Usuario;
  status: number;
  errors: any = {};  // Almacena los mensajes de error

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario(0, '', '', '', '', '', '');  // Inicialización del modelo Usuario
    this.status = -1;
  }

  onSubmit(form: any): void {
    // Utiliza el servicio UsuarioService para registrar el cliente como usuario
    this.usuarioService.crear(this.usuario).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.status === 201) {
          form.reset();
          this.changeStatus(0);  // Registro exitoso
          this.errors = {};  // Limpia los errores en caso de éxito
        } else {
          this.changeStatus(1);  // Error en el registro
        }
      },
      error: (error) => {
        console.error(error);
        this.changeStatus(2);  // Error de servidor
        if (error.status === 406) {
          this.errors = error.error.errors;  // Captura los errores de validación
          if (this.errors.correo) {
            this.changeStatus(3);  // Correo ya en uso
          }
        }
      }
    });
  }

  changeStatus(status: number): void {
    this.status = status;
    timer(5000).subscribe(() => {
      this.status = -1;
    });
  }
}
