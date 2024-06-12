import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClienteComponent {
  public status: number;

  constructor(
    public dialogRef: MatDialogRef<EditClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private clienteService: ClienteService
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
