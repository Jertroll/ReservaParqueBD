import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common'; 
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {
  usuario: Usuario;
  status: number;
  errors: any = {};  // Almacena los mensajes de error

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario(0, '', '', '', '', '', '');
    this.status = -1;
  }

  onSubmit(form: any): void {
    this.usuarioService.crear(this.usuario).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.status === 201) {
          form.reset();
          this.changeStatus(0);
          this.errors = {};  // Limpia los errores en caso de éxito
        } else {
          this.changeStatus(1);
        }
      },
      error: (error) => {
        console.error(error);
        this.changeStatus(2);
        if (error.status === 406) {
          this.errors = error.error.errors;  // Captura los errores de validación
          if (this.errors.correo) {
            this.changeStatus(3);  // Muestra mensaje de correo en uso
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
