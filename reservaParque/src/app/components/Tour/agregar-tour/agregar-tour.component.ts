import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../models/tour'; 
import { Parque } from '../../../models/parque';
import { timer } from 'rxjs';
import { ParqueService } from '../../../services/parque.service';
import { TourService } from '../../../services/tour.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-tour',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './agregar-tour.component.html',
  styleUrl: './agregar-tour.component.css'
})
export class AgregarTourComponent implements OnInit {
  
  public status: number;
  public tour: Tour;
  public fileName:string;
  parques: Parque[];

  constructor(
    private _tourService: TourService,
    private parqueService: ParqueService
  ) {
    this.status = -1;
    this.parques = [];
    this.tour = new Tour(0,'', 0, 0, '', '', 0,'');
    this.fileName="";
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
    console.log('Datos del tour antes de enviar:', this.tour);
     const [hours, minutes] = this.tour.horaInicio.split(':');
    this.tour.horaInicio = `${hours}:${minutes}`;
    
    // Convierte `duracion` en minutos si es una cadena.
    if (typeof this.tour.duracion === 'string') {
        this.tour.duracion = parseInt(this.tour.duracion, 10);
    }
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
    console.log(this.tour)
  }
  uploadImage(event:any){
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file0', file);

      this._tourService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log('Respuesta al subir imagen:', response);
          console.log(response);
          if (response.status === 201) {
            this.tour.imagen = response.filename;
            console.log('Nombre del archivo de imagen guardado en tour:', this.tour.imagen);
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(n => {
      this.status = -1;
    });
  }
}
