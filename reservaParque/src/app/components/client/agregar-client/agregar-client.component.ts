import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Cliente } from '../../../models/cliente'; 
import { ClienteService } from '../../../services/cliente.service'; 

@Component({
  selector: 'app-agregar-cliente',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './agregar-client.component.html',
  styleUrls: ['./agregar-client.component.css']
})
export class AgregarClienteComponent {

  cliente: Cliente;
  status: number;

  constructor(private clienteService: ClienteService) {
    this.cliente = new Cliente(0, '', '', 0, 0);
    this.status = -1;
  }

  onSubmit(form: any): void {
    this.clienteService.crear(this.cliente).subscribe({
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
