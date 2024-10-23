import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../../models/Empleado';
import { timer } from 'rxjs';
import { EmpleadoService } from '../../../services/empleado.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-empleado-create',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.css']
})
export class EmpleadoCreateComponent {
  public status: number;
  public empleado: Empleado;

  constructor(private empleadoService: EmpleadoService) {
    this.status = -1;
    this.empleado = new Empleado(0, 0, '', '', '', '', '','','');
  }

  onSubmit(form: any): void {
    this.empleadoService.crearEmpleados(this.empleado).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 201) {
          form.reset();
          this.changeStatus(0);
        } else {
          this.changeStatus(1);
        }
      },
      error: (error: Error) => {
        this.changeStatus(2);
      }
    });
  }

  changeStatus(st: number): void {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
