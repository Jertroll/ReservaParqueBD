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

  crear(usuario:Usuario):Observable<any>{
    let usuarioJson=JSON.stringify(usuario); //Aqui convierte el objeto a string
    let params='data='+usuarioJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'usuario',params,options);
}

obtenerUsuarios(): Observable<{ status: number, message: string, data: Usuario[] }> {
    return this._http.get<{ status: number, message: string, data: Usuario[] }>(`${this.urlAPI}cliente`);
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

  buscarUsuarioPorId(idUsuario: number): Observable<Usuario> {
    return this._http.get<{ status: number, message: string, usuario: Usuario }>(`${this.urlAPI}usuario/${idUsuario}`)
      .pipe(
        map(response => response.usuario), // Extraer el objeto de producto del cuerpo de la respuesta
        catchError(error => {
          console.error('Error al buscar usuario por ID:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
}
