import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../models/Empleado';
import { EmpleadoService } from '../../../services/empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { EditEmpleadoDialogComponent } from '../edit-empleado-dialog/edit-empleado-dialog.component'; // Asegúrate de crear este componente
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleado-up',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, NgFor, MatButtonModule,RouterModule],
  templateUrl: './empleadoup.component.html',
  styleUrls: ['./empleadoup.component.css']
})
export class EmpleadoUpComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  empleados: Empleado[];
  empleado: Empleado;
  editando: boolean = false;

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog) {
    this.status = -1;
    this.empleados = [];
    this.empleado = new Empleado(0, '', '', '', '', '', '','','');
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe(
      (response) => {
        if (response && response.data) {
          this.empleados = response.data;
        }
      },
      error => {
        console.error('Error fetching empleados', error);
      }
    );
  }

  eliminarEmpleado(empleado: Empleado): void {
    this.empleadoService.eliminarEmpleado(empleado.idEmpleado).subscribe(() => {
      this.empleados = this.empleados.filter(e => e !== empleado);
    });
  }

  actualizarEmpleado(empleado: Empleado): void {
    const dialogRef = this.dialog.open(EditEmpleadoDialogComponent, {
      width: '600px',
      data: { ...empleado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoService.actualizarEmpleado(result).subscribe({
          next: () => {
            this.obtenerEmpleados();
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
      this.empleadoService.buscarEmpleadoPorId(parseInt(this.searchTerm, 10)).subscribe(
        empleado => {
          if (empleado) {
            this.empleados = [empleado];
          } else {
            this.empleados = [];
          }
        },
        error => {
          console.error('Error al buscar Empleado por ID:', error);
        }
      );
    } else {
      this.obtenerEmpleados();
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
      this.empleadoService.actualizarEmpleado(this.empleado).subscribe({
        next: () => {
          this.resetForm();
          this.obtenerEmpleados();
          this.changeStatus(0);
        },
        error: () => {
          this.changeStatus(2);
        }
      });
    }
  }

  resetForm(): void {
    this.empleado = new Empleado(0, '', '', '', '', '', '','','');
    this.editando = false;
  }
}
