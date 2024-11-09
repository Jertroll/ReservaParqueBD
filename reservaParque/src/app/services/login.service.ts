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

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.urlAPI, { correo, contrasena }, { headers });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }

  setSession(token: string, role: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
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
