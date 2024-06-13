import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ActivatedRoute,Route } from '@angular/router';

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
  public status: number;
  public cliente: Cliente;

  
  constructor(
    private _clienteService: ClienteService
  ) {
    this.status = -1;
    this.cliente = new Cliente(0, '', '', 0, 0);
  }

  onSubmit(form: any) {
    this._clienteService.crear(this.cliente).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.status == 200) {
          form.reset();
          this.changeStatus(0);
        } else {
          this.changeStatus(1);
        }
      },
      error: (error: Error) => {
        this.changeStatus(2);
      }
    })
  }

  changeStatus(st:number){
    this.status=st;
    let countdown=timer(5000);
    countdown.subscribe(n=>{
      this.status=-1;
    })
  }
}
