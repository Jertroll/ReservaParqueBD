import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from "./global";  // Asegúrate de que esta ruta sea correcta
import { Router } from "@angular/router"; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlAPI: string;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.urlAPI = `${server.url}login`;  // Define la URL para el endpoint de login
  }

  private sessionStorageKey = 'identity';  // Llave para almacenar la identidad del usuario

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.urlAPI, { correo, contrasena }, { headers });
  }


  getIdentityFromAPI() {
    const token = sessionStorage.getItem('token');  // Recuperar el token de sessionStorage
    if (!token) {
      throw new Error('Token no proporcionado');  // Lanzar un error si no se encuentra el token
    }

    const headers = new HttpHeaders({
      'ReservaTour': token  // Enviar el token en el encabezado 'ReservaTour'
    });

    // Asegurarse de que la URL sea completa (incluyendo la base del servidor)
    const identityUrl = `${server.url}identity`;

    return this._http.get(identityUrl, { headers });
  }

  
  getIdentityFromStorage() {
    const identity = sessionStorage.getItem('identity');
    if (identity) {
      return JSON.parse(identity);  // Devuelve la identidad almacenada si existe
    }
    return null; 
  }

  setSession(token: string, role: string, identity: any): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('identity', JSON.stringify(identity));  // Guardar la identidad del usuario
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('identity');  // También eliminamos la identidad
    this.router.navigate(['/login']);  // Redirigir al login o la página de inicio de sesión
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
