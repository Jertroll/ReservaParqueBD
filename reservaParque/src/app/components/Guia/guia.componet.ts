import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'guia',
  standalone: true,
  imports: [
    RouterModule, // Añadir esta línea
    RouterOutlet,
    RouterLink,
    FormsModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent {}
