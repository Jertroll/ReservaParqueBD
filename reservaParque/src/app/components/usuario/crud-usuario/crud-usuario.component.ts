import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    NgFor,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css',
})
export class CrudUsuarioComponent {
  searchTerm: string = '';
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario(0, '', '', '', '', '', '');
  editando: boolean = false;
  status: number = -1;

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        if (response && response.data) {
          this.usuarios = response.data;
        }
      },
      (error) => {
        console.error('Error fetching clientes', error);
      }
    );
  }

  eliminarUsuario(usuario: Usuario): void {
    this.usuarioService.eliminarUsuario(usuario.idUsuario).subscribe(() => {
      this.usuarios = this.usuarios.filter((p) => p !== usuario);
    });
  }

  actualizarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '600px',
      data: { ...usuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuarioService.actualizarUsuario(result).subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.changeStatus(0);
          },
          error: () => {
            this.changeStatus(2);
          },
        });
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.usuarioService
        .buscarUsuarioPorId(parseInt(this.searchTerm, 10))
        .subscribe(
          (response: any) => {
            // Si la respuesta es exitosa y tiene el usuario
            if (response && response.user) {
              this.usuarios = [response.user];
            } else {
              this.usuarios = [];
            }
          },
          (error: HttpErrorResponse) => {
            // Si Angular considera esto un error (por ejemplo, 404)
            if (error.status === 404) {
              console.log('Usuario no encontrado');
              this.usuarios = [];
            } else {
              console.error('Error al buscar Usuario por ID:', error);
            }
          }
        );
    } else {
      this.obtenerUsuarios();
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
      this.usuarioService.actualizarUsuario(this.usuario).subscribe({
        next: () => {
          this.resetForm();
          this.obtenerUsuarios();
          this.changeStatus(0);
        },
        error: () => {
          this.changeStatus(2);
        }
      });
    }
  }

  resetForm(): void {
    this.usuario = new Usuario(0, '', '', '', '', '', '');
    this.editando = false;
  }

}
