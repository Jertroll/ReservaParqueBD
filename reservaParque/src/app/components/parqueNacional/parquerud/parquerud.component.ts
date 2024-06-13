import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parque } from '../../../models/parque'; 
import { ParqueService } from '../../../services/parque.service'; 
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditParqueDialogComponent } from '../edit-parque-dialog/edit-parque-dialog.component'; 
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Asegúrate de importar esto

@Component({
  selector: 'app-parquerud',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, NgFor, MatButtonModule],
  templateUrl: './parquerud.component.html',
  styleUrls: ['./parquerud.component.css']
})
export class ParquerudComponent implements OnInit {
  status: number;
  searchTerm: string = '';
  parques: Parque[];
  parque: Parque;
  editando: boolean = false;

  constructor(private parqueService: ParqueService, public dialog: MatDialog) {
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

  eliminarParque(parque: Parque): void {
    this.parqueService.eliminarParque(parque.idParque).subscribe(() => {
      this.parques = this.parques.filter(p => p !== parque);
    });
  }

  actualizarParque(parque: Parque): void {
    const dialogRef = this.dialog.open(EditParqueDialogComponent, {
      width: '600px',
      data: { ...parque }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parqueService.actualizarParque(result).subscribe({
          next: () => {
            this.obtenerParques();
            this.changeStatus(0);
          },
          error: () => {
            this.changeStatus(2);
          }
        });
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.parqueService.buscarParquePorId(parseInt(this.searchTerm, 10)).subscribe(
        parque => {
          if (parque) {
            this.parques = [parque];
          } else {
            this.parques = [];
          }
        },
        error => {
          console.error('Error al buscar Parque por ID:', error);
        }
      );
    } else {
      this.obtenerParques();
    }
  }

  changeStatus(status: number): void {
    this.status = status;
    setTimeout(() => {
      this.status = -1;
    }, 3000);
  }

  onSubmit(form: any): void {
    if (this.editando) {
      this.parqueService.actualizarParque(this.parque).subscribe({
        next: () => {
          this.resetForm();
          this.obtenerParques();
          this.changeStatus(0);
        },
        error: () => {
          this.changeStatus(2);
        }
      });
    }
  }

  resetForm(): void {
    this.parque = new Parque(0, '', '', '', '', '', '', 0);
    this.editando = false;
  }
}
