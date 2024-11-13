import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
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
      console.log(response); // Verificar la respuesta para asegurarse de la estructura

      if (response.token) {
        // Almacena el token
        sessionStorage.setItem('token', response.token);

        // Llama a getIdentityFromAPI para obtener la identidad completa del usuario
        this.loginService.getIdentityFromAPI().subscribe({
          next: (resp) => {
            console.log(resp); // Verifica la identidad
            this.loginService.setSession(response.token, response.role || '', resp);
            sessionStorage.setItem('idUsuario', JSON.stringify(resp));
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error al obtener la identidad', error);
            this.errorMessage = 'Error al obtener la identidad del usuario';
          }
        });
      } else {
        this.handleLoginError('Credenciales incorrectas');
      }
    },
    error: (error) => {
      this.handleLoginError(error.error?.message || 'Correo o contraseña incorrectos');
    }
  });
}

  
  private handleLoginError(message: string) {
    // Asigna el mensaje de error a la variable para mostrarlo en la interfaz
    this.errorMessage = message;
  }
  
}
