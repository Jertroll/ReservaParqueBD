import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;
  public isGuide: boolean = false; // Nueva propiedad para el rol de guía
  public isLoggedIn: boolean = false;

  ngOnInit() {
    // Obtener la identidad del usuario desde sessionStorage
    const identity = sessionStorage.getItem('identity');
    
    if (identity) {
      this.isLoggedIn = true;
      const user = JSON.parse(identity);
      
      // Verificar el rol del usuario
      this.isAdmin = user.role === 'admin';
      this.isGuide = user.role === 'Guia'; // Verificar si el rol es "Guia"
    }
  }

  onLogout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isGuide = false;
  }
}
