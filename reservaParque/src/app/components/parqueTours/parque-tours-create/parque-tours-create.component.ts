import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParqueToursService } from '../../../services/parqueTours.service';

@Component({
  selector: 'app-parque-tours',
  templateUrl: './parque-tours-create.component.html',
  styleUrls: ['./parque-tours-create.component.css']
})
export class ParqueToursComponent implements OnInit {
  parque: any;
  tours: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ParqueToursService: ParqueToursService
  ) { }

  ngOnInit(): void {
    const idParque = +this.route.snapshot.paramMap.get('idParque')!;
    this.ParqueToursService.obtenerParqueConTours(idParque).subscribe(data => {
      this.parque = data;
      this.tours = data.tours;
    });
  }
}
