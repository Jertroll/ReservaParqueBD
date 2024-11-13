import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Parque } from '../../../models/parque'; 
import { ParqueService } from '../../../services/parque.service'; 
import { Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-ver-parques',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule, DatePipe, CurrencyPipe,],
  templateUrl: './ver-parques.component.html',
  styleUrl: './ver-parques.component.css'
})
export class VerParquesComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  parques: Parque[];
  parque: Parque;
  nombreParque: string = '';  // Nueva propiedad para la búsqueda de tours
  tours: any[] = [];  // Nueva propiedad para almacenar los tours encontrados

  constructor(private parqueService: ParqueService, public router:Router, private tourService: TourService) {
    this.status = -1;
    this.parques = [];
    this.parque = new Parque(0, '', '', '', '', '', '', 0);
  }
  ngOnInit(): void {
    this.obtenerParques();
  }
  obtenerParques(): void {
    this.parqueService.obtenerParques().subscribe(
      (response) => {
        if (response && response.data) {
          this.parques = response.data;
        }
      },
      error => {
        console.error('Error fetching parques', error);
      }
    );
  }
  buscarTours(): void {
    this.tourService.obtenerToursPorParque(this.nombreParque).subscribe(
      (response: any) => {
        if (response && (response as { data: any[] }).data) {
          this.tours = (response as { data: any[] }).data;
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
