import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { Parque } from '../../../models/parque';
import { TourService } from '../../../services/tour.service';
import { ParqueService } from '../../../services/parque.service';

@Component({
  selector: 'app-edit-tour',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-tour.component.html',
  styleUrl: './edit-tour.component.css'
})
export class EditTourComponent {
  public status: number;
  parques: Parque[];
  constructor(
    public dialogRef: MatDialogRef<EditTourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tourService:TourService,   private parqueService: ParqueService // Inyectar el servicio
  ) {
    this.parques = [];
    this.status = -1;
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
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any){
     this.tourService.actualizarTour(this.data).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 200) {
            form.reset();
            this.changeStatus(0);
            this.dialogRef.close(response);
          } else {
            this.changeStatus(1);
          }
        },
        error: (error: Error) => {
          this.changeStatus(2);
          console.error(error);
        }
      });
  }

  changeStatus(st: number){
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
