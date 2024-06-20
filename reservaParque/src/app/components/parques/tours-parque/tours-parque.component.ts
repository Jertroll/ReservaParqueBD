import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-tours-parque',
  templateUrl: './tours-parque.component.html',
  styleUrls: ['./tours-parque.component.css']
})
export class ToursParqueComponent implements OnInit {
  idParque: number = 0;
  tours: Tour[] = [];

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParqueStr = params.get('idParque');
      if (idParqueStr) {
        this.idParque = parseInt(idParqueStr, 10);
        if (!isNaN(this.idParque)) {
          this.obtenerToursDelParque(this.idParque);
        } else {
          console.error('idParque is not a valid number');
        }
      } else {
        console.error('idParque is null');
      }
    });
  }

  obtenerToursDelParque(idParque: number): void {
    this.tourService.obtenerToursPorParque(idParque).subscribe(
      response => {
        if (response && response.data) {
          this.tours = response.data;
        } else {
          this.tours = [];
        }
      },
      error => {
        console.error('Error fetching tour', error);
      }
    );
  }
}
