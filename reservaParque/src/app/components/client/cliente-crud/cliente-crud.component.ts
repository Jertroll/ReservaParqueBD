import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { EditClienteComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-cliente-crud',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {
  estado: number;
  nombreBuscado: string = '';
  clientes: Cliente[];
  cliente: Cliente;
  enEdicion: boolean = false;
  buscaNom: string = '';

  constructor(private servicioCliente: ClienteService, public dialog: MatDialog) {
    this.estado = -1;
    this.clientes = [];
    this.cliente = new Cliente(0, '', '', 0, '');
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.servicioCliente.getClientes().subscribe((respuesta: any) => {
      this.clientes = respuesta.data;
    });
  }

  guardarCliente(): void {
    if (this.enEdicion) {
      this.servicioCliente.actualizarCliente(this.cliente).subscribe(() => {
        this.cargarClientes();
        this.resetearFormulario();
      });
    } else {
      this.servicioCliente.crear(this.cliente).subscribe(() => {
        this.cargarClientes();
        this.resetearFormulario();
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.cliente = { ...cliente };
    this.enEdicion = true;
  }

  eliminar(idCliente: number): void {
    this.servicioCliente.eliminarCliente(idCliente).subscribe(() => {
      this.cargarClientes();
    });
  }

  resetearFormulario(): void {
    this.cliente = new Cliente(0, '', '', 0, '');
    this.enEdicion = false;
  }

  buscar(): void {
    if (this.nombreBuscado.trim()) {
      this.servicioCliente.buscarCliente(this.nombreBuscado).subscribe((respuesta: any) => {
        this.clientes = respuesta.data;
      });
    } else {
      this.cargarClientes();
    }
  }
}
