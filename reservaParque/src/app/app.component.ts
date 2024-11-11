import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;
  public isLoggedIn: boolean = false;

  ngOnInit() {
    // Obtener la identidad del usuario desde sessionStorage
    const identity = sessionStorage.getItem('identity');
    
    if (identity) {
      this.isLoggedIn = true;
      const user = JSON.parse(identity);
      
      // Verificar si el rol del usuario es "admin"
      this.isAdmin = user.role === 'admin';
    }
  }

  onLogout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
