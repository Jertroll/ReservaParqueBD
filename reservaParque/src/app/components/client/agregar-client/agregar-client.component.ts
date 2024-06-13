import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente'; 
import { ClienteService } from '../../../services/cliente.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './agregar-client.component.html',
  styleUrls: ['./agregar-client.component.css']
})
export class AgregarClienteComponent implements OnInit {
  public status: number;
  public cliente: Cliente;

  
  constructor(
    private servicioCliente: ClienteService
  ) {
    this.status = -1;
    this.cliente = new Cliente(0, '', '', 0, '');
  }

  ngOnInit() {}

  onSubmit(form: any) {
    this.servicioCliente.crear(this.cliente).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.status == 201) {
          form.reset();
          this.cambiarEstado(0);
        } else {
          this.cambiarEstado(1);
        }
      },
      error: (error: Error) => {
        this.cambiarEstado(2);
      }
    })
  }

  cambiarEstado(estado: number) {
    this.status = estado;
    let cuentaRegresiva = timer(5000);
    cuentaRegresiva.subscribe(n => {
      this.status = -1;
    });
  }
}
