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
  styleUrls: ['./facturacli.component.css'] // Asegúrate de usar 'styleUrls' con 's' al final
})
export class FacturacliComponent {
  public status: number;
  public factura: Factura;
  public idReserva: number;

  constructor(private _facturaService: FacturaService) {
    this.status = -1;
    this.factura = new Factura(0, 0, "", 0, 0, 0, 0);
    this.idReserva = 0; // Asigna un valor predeterminado, actualízalo según sea necesario
  }

  onSubmit(form: any) {
    this._facturaService.crear(this.idReserva, this.factura).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 200) {
          form.reset();
          this.changeStatus(0);
        } else {
          this.changeStatus(1);
        }
      },
      error: (error: Error) => {
        this.changeStatus(2);
      }
    });
  }

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
