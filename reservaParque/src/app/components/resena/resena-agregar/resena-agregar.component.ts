import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResenaService } from '../../../services/resena.service';
import { ParqueService } from '../../../services/parque.service';
import { Resena } from '../../../models/resena';
import { Parque } from '../../../models/parque';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-resena-agregar',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './resena-agregar.component.html',
  styleUrls: ['./resena-agregar.component.css'],
})
export class ResenaAgregarComponent implements OnInit {
  resenas: Resena[] = [];
  nuevaResena: Resena = new Resena(0, 0, 0, '', 0, ''); // Nueva reseña
  parques: any[] = []; // Lista de parques nacionales
  mensajeEstado: string = '';

  constructor(
    private resenaService: ResenaService,
    private parqueService: ParqueService
  ) {}

  ngOnInit(): void {
    this.cargarParques();
    this.cargarResenas();
    this.setDefaultValues();
  }

  getIdentity(): string {
    const identity = JSON.parse(sessionStorage.getItem('identity') || '{}');
    return identity.user_id || '';
  }

  setDefaultValues(): void {
    this.nuevaResena.idUsuario = parseInt(this.getIdentity(), 10);
    this.nuevaResena.fechaResena = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  cargarParques(): void {
    this.parqueService.obtenerParques().subscribe({
      next: (response) => (this.parques = response.data),
      error: (error) => console.error('Error al cargar parques:', error),
    });
  }

  cargarResenas(): void {
    this.resenaService.obtenerResenas().subscribe({
      next: (resenas) => (this.resenas = resenas),
      error: (error) => console.error('Error al cargar reseñas:', error),
    });
  }

  agregarResena(): void {
    // Convertir idParque y calificacion a números antes de enviar
    this.nuevaResena.idParque = +this.nuevaResena.idParque;
    this.nuevaResena.calificacion = +this.nuevaResena.calificacion;
    
    this.resenaService.crearResena(this.nuevaResena).subscribe({
      next: (respuesta) => {
        this.mensajeEstado = 'Reseña agregada exitosamente!';
        this.cargarResenas();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al agregar la reseña:', error);
        this.mensajeEstado = 'Error al agregar la reseña';
      },
    });
  }

  resetForm(): void {
    this.nuevaResena = new Resena(0, parseInt(this.getIdentity(), 10), 0, '', 0, formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  }
}
