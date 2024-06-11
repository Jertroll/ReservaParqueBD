import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tour } from '../../../models/tour';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TourService } from '../../../services/tour.service';
import { EditTourComponent } from '../edit-tour/edit-tour.component';


@Component({
  selector: 'app-crud-tour',
  standalone: true,
  imports: [FormsModule, CommonModule,MatIconModule],
  templateUrl: './crud-tour.component.html',
  styleUrl: './crud-tour.component.css'
})
export class CrudTourComponent {
  status: number;
  searchTerm: string = '';
  tours: Tour[];
  tour: Tour;
  editando: boolean = false;
  constructor(private tourService: TourService, public dialog: MatDialog) {
    this.status = -1;
    this.tours = [];
    this.tour = new Tour(0, 0, 0, 0, '', 0, 0);
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
      console.error('Error fetching productos', error);
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
    if (this.searchTerm.trim() !== '') {
      // Llamar al servicio para buscar el producto por su ID
      this.tourService.buscarTour(parseInt(this.searchTerm, 10)).subscribe(
        tour => {
          console.log('Producto encontrado:', tour); // Agregar esta línea para depurar
          if (tour) {
            // Producto encontrado, actualizar la lista de productos
            this.tours = [tour];
          } else {
            // Producto no encontrado, vaciar la lista de productos
            this.tours = [];
          }
        },
        error => {
          console.error('Error al buscar producto por ID:', error);
          // Manejo de errores, si es necesario
        }
      );
    } else {
      // Si el término de búsqueda está vacío, mostrar todos los productos
      this.verTour();
    }
  }
  resetForm(): void {
    this.tour = new Tour(0, 0, 0, 0, '', 0, 0);
    this.editando = false;
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }


}
