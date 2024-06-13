import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tour } from '../../../models/tour';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TourService } from '../../../services/tour.service';
import { EditTourComponent } from '../edit-tour/edit-tour.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-crud-tour',
  standalone: true,
  imports: [FormsModule, CommonModule,MatIconModule, RouterModule],
  templateUrl: './crud-tour.component.html',
  styleUrl: './crud-tour.component.css'
})
export class CrudTourComponent {
  status: number;
  buscaNom: string = '';
  tours: Tour[];
  tour: Tour;
  editando: boolean = false;
  constructor(private tourService: TourService, public dialog: MatDialog) {
    this.status = -1;
    this.tours = [];
    this.tour = new Tour(0,'', 0, 0, '', 0, 0);
  }
  ngOnInit(): void {
    this.verTour();
  }

  verTour(): void {
    this.tourService.verTours().subscribe(response => {
      if (response && response.data) {
        this.tours = response.data; // Acceso correcto al array de productos
      }
    }, error => {
      console.error('Error fetching tours', error);
    });
  }

  eliminarTour(tour: Tour): void {
    this.tourService.eliminarTour(tour.idTour).subscribe(() => {
      this.tours = this.tours.filter(p => p !== tour);
    });
  }

  actualizarTour(tour: Tour): void {
    const dialogRef = this.dialog.open(EditTourComponent, {
      width: '600px',
      data: { ...tour }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tourService.actualizarTour(result).subscribe({
          next: (response) => {
            console.log(response);
            this.verTour();
            this.changeStatus(0);
          },
          error: (error: Error) => {
            this.changeStatus(2);
          }
        });
      }
    });
  }

  onSubmit(form: any): void {
    if (this.editando) {
      this.tourService.actualizarTour(this.tour).subscribe({
        next: (response) => {
          console.log(response);
          this.resetForm();
          this.verTour();
          this.changeStatus(0);
        },
        error: (error: Error) => {
          this.changeStatus(2);
        }
      });
    }
  }

  buscar(): void {
    if (!this.buscaNom.trim()) {
      // No se ha ingresado nada para buscar
      return;
    }

    this.tourService.buscarNombre(this.buscaNom).subscribe(
      response => {
        if (response.status === 200) {
          this.tours = response.data;
          this.status = 0; // Tours encontrados
        } else {
          this.tours = [];
          this.status = 1; // No se encontraron tours
        }
      },
      error => {
        console.error('Error al buscar tours:', error);
        this.tours = [];
        this.status = 2; // Error al buscar tours
      }
    );
  }
  resetForm(): void {
    this.tour = new Tour(0,'', 0, 0, '', 0, 0);
    this.editando = false;
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }


}
