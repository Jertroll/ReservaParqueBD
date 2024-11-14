import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Parque } from '../../../models/parque'; 
import { ParqueService } from '../../../services/parque.service'; 
import { Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { RouterModule } from '@angular/router';
import { Resena } from '../../../models/resena';
import { ResenaService } from '../../../services/resena.service';
// Interfaz extendida localmente
interface ParqueConResenas extends Parque {
  showResenas: boolean;
  resenas: Resena[]; // Ajusta el tipo de las reseñas según tu modelo
}

@Component({
  selector: 'app-ver-parques',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './ver-parques.component.html',
  styleUrls: ['./ver-parques.component.css']
})
export class VerParquesComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  parques: ParqueConResenas[] = [];
  nombreParque: string = '';  
  tours: any[] = []; 

  constructor(private parqueService: ParqueService, public router: Router, private tourService: TourService, private resenaService: ResenaService) {
    this.status = -1;
  }

  ngOnInit(): void {
    this.obtenerParques();
  }

  obtenerParques(): void {
    this.parqueService.obtenerParquesConResenas().subscribe(
      (response: Parque[]) => {
        if (Array.isArray(response)) {
          this.parques = response.map(parque => ({
            ...parque,
            showResenas: false,
            resenas:[]
          }));
        }
      },
      error => {
        console.error('Error fetching parques', error);
      }
    );
  }

  toggleResenas(parque: ParqueConResenas): void {
    parque.showResenas = !parque.showResenas;
    
    // Cargar reseñas solo si aún no están cargadas
    if (parque.showResenas && parque.resenas.length === 0) {
      this.resenaService.obtenerResenasPorParque(parque.idParque).subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            parque.resenas = response.data;
          } else {
            console.error('La respuesta no contiene un arreglo en la propiedad data:', response);
          }
        },
        (error) => {
          console.error('Error al obtener las reseñas del parque', error);
        }
      );
    }
  }
  

  buscarTours(): void {
    this.tourService.obtenerToursPorParque(this.nombreParque).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.tours = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los tours:', error);
        this.tours = [];
      }
    );
  }

  regresar() {
    this.tours = [];
    this.nombreParque = '';
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }
}
