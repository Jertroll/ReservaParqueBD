import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { ParqueService } from '../../../services/parque.service';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-parque-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './edit-parque-dialog.component.html',
  styleUrls: ['./edit-parque-dialog.component.css'] // corregido 'styleUrl' a 'styleUrls'
})
export class EditParqueDialogComponent {
  public status: number;

  constructor(
    public dialogRef: MatDialogRef<EditParqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parqueService: ParqueService // corregido el typo en 'parqueService'
  ) {
    this.status = -1;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any): void {
    this.parqueService.actualizarParque(this.data).subscribe({
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

  changeStatus(st: number): void {
    this.status = st;
    let countdown = timer(5000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }
}
