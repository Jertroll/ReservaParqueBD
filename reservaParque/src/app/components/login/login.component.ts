import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.correo, this.contrasena).subscribe({
      next: (response) => {
        console.log(response); // Ver el formato de la respuesta

        if (response.status !== 401 && response.token && response.role) {
          // Almacena el token en sessionStorage
          sessionStorage.setItem('token', response.token);

          // Obtener la identidad del usuario desde el backend usando el token
          this.loginService.getIdentityFromAPI().subscribe({
            next: (resp) => {
              console.log(resp); // Verifica la identidad
              this.loginService.setSession(response.token, response.role, resp);
              // Guarda la identidad en sessionStorage
              sessionStorage.setItem('idUsuario', JSON.stringify(resp));

              // Redirige a la página principal
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error al obtener la identidad', error);
              this.errorMessage = 'Error al obtener la identidad del usuario';
            }
          });
        } else {
          console.error('Error de credenciales', response.message);
          this.errorMessage = response.message || 'Credenciales incorrectas';
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = error.error?.message || 'Error en el inicio de sesión, correo o contraseña incorrectos';
      }
    });
  }
}
