import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
        if (response.token) {
          this.loginService.setSession(response.token, response.role);
          this.router.navigate(['/home']); // Redirigir a la página principal o deseada
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error en el inicio de sesión';
      }
    });
  }
}
