import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditClienteComponent } from '../edit-client/edit-client.component';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Asegúrate de importar esto


import { RouterModule } from '@angular/router';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-crud',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, NgFor, MatButtonModule, RouterModule],
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  clientes: Cliente[];
  cliente: Cliente;
  editando: boolean = false;


  constructor(private clienteService: ClienteService, public dialog: MatDialog) {
    this.status = -1;
    this.clientes = [];
    this.cliente = new Cliente(0, '', '', 0, 0);
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(
      (response) => {
        if (response && response.data) {
          this.clientes = response.data;
        }
      },
      error => {
        console.error('Error fetching cliente', error);
      }
    );
  }

  eliminarCliente(cliente: Cliente): void {
    this.clienteService.eliminarCliente(cliente.idCliente).subscribe(() => {
      this.clientes = this.clientes.filter(p => p !== cliente);
    });
  }


  actualizarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditClienteComponent, {
      width: '600px',
      data: { ...cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.actualizarCliente(result).subscribe({
          next: () => {
            this.obtenerClientes();
            this.changeStatus(0);
          },
          error: () => {
            this.changeStatus(2);
          }
        });
      }
    });
  }


  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.clienteService.buscarClientePorId(parseInt(this.searchTerm, 10)).subscribe(
        cliente => {
          if (cliente) {
            this.clientes = [cliente];
          } else {
            this.clientes = [];
          }
        },
        error => {
          console.error('Error al buscar Cliente por ID:', error);
        }
      );
    } else {
      this.obtenerClientes();
    }
  }


  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }


  onSubmit(form: any): void {
    if (this.editando) {
      this.clienteService.actualizarCliente(this.cliente).subscribe({
        next: () => {
          this.resetForm();
          this.obtenerClientes();
          this.changeStatus(0);
        },
        error: () => {
          this.changeStatus(2);
        }
      });
    }
  }

  resetForm(): void {
    this.cliente = new Cliente(0, '', '', 0, 0);
    this.editando = false;
  }
}
