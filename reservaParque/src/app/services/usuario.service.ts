import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { server } from './global';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlAPI: string;

  constructor(
    private _http: HttpClient
  ){
    this.urlAPI = server.url;
  }

  crear(usuario: Usuario): Observable<any> {
    const params = new URLSearchParams();
    params.set('data', JSON.stringify(usuario)); // Aquí se convierte en formato URL-encoded
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this._http.post(this.urlAPI + 'usuario', params.toString(), { headers });
  }
  

obtenerUsuarios(): Observable<{ status: number, message: string, data: Usuario[] }> {
    return this._http.get<{ status: number, message: string, data: Usuario[] }>(`${this.urlAPI}usuarios`);
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    let usuarioJson = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
      headers
    }
    const body = new URLSearchParams();

     body.set('nombre', usuario.nombre);
     body.set('cedula', usuario.cedula.toString());
     body.set('telefono', usuario.telefono.toString());



 return this._http.put(`${this.urlAPI}usuario/${usuario.idUsuario}`, body.toString(), { headers });
}

  eliminarUsuario(idUsuario: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}usuario/${idUsuario}`);
  }

  buscarUsuarioPorId(idUsuario: number): Observable<any> {
    return this._http.get(`${this.urlAPI}usuario/${idUsuario}`);
  }
  
}
