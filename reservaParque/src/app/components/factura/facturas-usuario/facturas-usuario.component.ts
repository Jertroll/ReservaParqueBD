import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute } from '@angular/router';
import { server } from '../../../services/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturas-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas-usuario.component.html',
  styleUrls: ['./facturas-usuario.component.css']
})
export class FacturasUsuarioComponent implements OnInit {
  public url: string;
  facturas: any[] = [];
  idUsuario!: number;
  mensajeError: string | null = null;

  constructor(
    private facturaService: FacturaService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.url = server.url;
  }

  ngOnInit(): void {
    // Obtener el ID del usuario autenticado o el ID desde la URL
    const idUsuario = this.loginService.getUserId();
    if (idUsuario) {
      this.idUsuario = idUsuario;
    } else {
      // Alternativamente, tomar el ID de la ruta si es necesario
      this.idUsuario = Number(this.route.snapshot.paramMap.get('idUsuario'));
    }

    // Llama al servicio para obtener las facturas del usuario
    this.facturaService.getFacturasPorUsuario(this.idUsuario).subscribe({
      next: (response) => {
        this.facturas = response.facturas;
      },
      error: (err) => {
        this.mensajeError = err.error.message || 'Error al obtener las facturas';
      }
    });
  }
}

