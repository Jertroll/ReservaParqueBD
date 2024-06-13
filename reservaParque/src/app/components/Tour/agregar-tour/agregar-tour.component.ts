import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../models/tour'; 
import { Parque } from '../../../models/parque';
import { timer } from 'rxjs';
import { ParqueService } from '../../../services/parque.service';
import { TourService } from '../../../services/tour.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-tour',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-tour.component.html',
  styleUrl: './agregar-tour.component.css'
})
export class AgregarTourComponent implements OnInit {
  
  public status: number;
  public tour: Tour;
  parques: Parque[];

  constructor(
    private _tourService: TourService,
    private parqueService: ParqueService
  ) {
    this.status = -1;
    this.parques = [];
    this.tour = new Tour(0,'', 0, 0, '', 0, 0);
  }

  ngOnInit() {
    this.mostrarParques();
  }

  mostrarParques() {
    this.parqueService.obtenerParques().subscribe(
      (response) => {
        this.parques = response.data; // Asegúrate de asignar los datos correctamente
      },
      error => {
        console.error('Error loading parques', error);
      }
    );
  }

  onSubmit(form: any) {
    this._tourService.crear(this.tour).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 201) {
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

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(n => {
      this.status = -1;
    });
  }
}
