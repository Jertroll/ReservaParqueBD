import { Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura'; 
import { timer } from 'rxjs';
import { FacturaService } from '../../../services/factura.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturacli',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './facturacli.component.html',
  styleUrls: ['./facturacli.component.css'] 
})
export class FacturacliComponent implements OnInit {
  public status: number;
  public facturas: Factura[] = [];

  constructor(private _facturaService: FacturaService) {
    this.status = -1;
  }

  ngOnInit(): void {
    this.getFacturas();
  }
  getFacturas(): void {
    this._facturaService.getAllFacturas().subscribe(
      response => {
        if (response.status === 200) {
          // Asigna las facturas obtenidas a la variable local
          this.facturas = response.data;
          this.status = 200;
        } else {
          this.status = response.status;
        }
      },
      error => {
        console.error('Error fetching facturas:', error);
        this.status = 500; // Status de error
      }
    );
  }
  
}
