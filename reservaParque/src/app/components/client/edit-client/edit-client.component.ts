import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { Cliente } from '../../../models/usuario';
import { ClienteService } from '../../../services/usuario.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClienteComponent {
  public status: number;

  constructor(
    public dialogRef: MatDialogRef<EditClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService // corregido el typo en 'parqueService'
  ) {
    this.status = -1;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onSubmit(form: any) {
    this.clienteService.actualizarCliente(this.data).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 200) {
          form.reset();
          this.changeStatus(0);
          this.dialogRef.close(response);
        } else {
          this.changeStatus(1);
        }
      },
      error: (error: Error) => {
        this.changeStatus(2);
        console.error(error);
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
