import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Usuario } from '../../../models/usuario';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {

usuario: Usuario;
status: number;

constructor(private usuarioService: UsuarioService) {
  this.usuario = new Usuario(0, 0, '', '', '', 0, '');
  this.status = -1;
}

onSubmit(form: any): void {
  this.usuarioService.crear(this.usuario).subscribe({
    next: (respuesta) => {
      console.log(respuesta);
      if (respuesta.status === 200) {
        form.reset();
        this.changeStatus(0);
      } else {
        this.changeStatus(1);
      }
    },
    error: (error: Error) => {
      console.error(error);
      this.changeStatus(2);
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
