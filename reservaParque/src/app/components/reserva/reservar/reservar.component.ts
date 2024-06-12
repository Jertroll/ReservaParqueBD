import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { Tour } from '../../../models/tour';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {
  public status: number;
  tours: Tour[];
  selectedTours: Tour[];
  constructor(
    private _tourService: TourService,
  ) {
    this.status = -1;
    this.tours = [];
    this.selectedTours = [];
  
  }
  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this._tourService.verTours().subscribe(response => {
      if (response && response.data) {
        this.tours = response.data;
      }
    });
  }
  addToReserva(tour: Tour): void {
    this.selectedTours.push(tour);
  }
  createReserva(): void {
    const detalles = this.selectedTours.map(tour => ({
      idTour: tour.idTour,
      fechaTour: new Date().toISOString().split('T')[0],
      horaTour: '10:00',
      idEmpleado: this.idEmpleado,
      cantVisitantes: this.cantVisitantes,
      precioUnitario: this.precioUnitario
    }));

    this.reservaService.crearReserva(this.fechaReserva, detalles).subscribe(response => {
      if (response.status === 201) {
        console.log('Reserva creada:', response.data);
      } else {
        console.error('Error al crear la reserva:', response.message);
      }
    });
  }

}
