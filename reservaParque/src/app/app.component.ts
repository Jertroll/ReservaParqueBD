import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//PRIMENG
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;
  public isGuide: boolean = false;
  public isLoggedIn: boolean = false;
  public isUsuario: boolean = false; // Nueva propiedad para usuarios con `type` usuario

  ngOnInit() {
    // Obtener la identidad del usuario desde sessionStorage
    const identity = sessionStorage.getItem('identity');
    
    if (identity) {
      this.isLoggedIn = true;
      const user = JSON.parse(identity);
      
      // Verificar el tipo de usuario
      this.isUsuario = user.type === 'usuario';
      this.isAdmin = user.role === 'admin' && !this.isUsuario;
      this.isGuide = user.role === 'Guia' && !this.isUsuario;
    }
  }

  onLogout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isGuide = false;
    this.isUsuario = false;
  }
}
