import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { server } from './global';
import { Resena } from '../models/resena';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = `${server.url}resena`;  // Base URL para las reseñas
  }

  // Crear una nueva reseña
  crearResena(resena: Resena): Observable<any> {
    const resenaJson = JSON.stringify(resena);
    const params = 'data=' + encodeURIComponent(resenaJson);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    console.log('Datos enviados al backend:', params); // Log de los datos enviados

    return this._http.post(`${this.urlAPI}`, params, { headers });
  }

  // Obtener todas las reseñas
  obtenerResenas(): Observable<Resena[]> {
    return this._http.get<Resena[]>(this.urlAPI).pipe(
      catchError((error) => {
        console.error('Error al obtener reseñas:', error);
        return throwError(error);
      })
    );
  }

  // Obtener una reseña por su ID
  obtenerResenaPorId(id: number): Observable<Resena> {
    return this._http.get<Resena>(`${this.urlAPI}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener la reseña con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  // Actualizar una reseña existente
  actualizarResena(id: number, resena: Resena): Observable<any> {
    const resenaJson = JSON.stringify(resena);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = new URLSearchParams();
    body.set('idUsuario', resena.idUsuario.toString());
    body.set('idParque', resena.idParque.toString());
    body.set('comentario', resena.comentario);
    body.set('calificacion', resena.calificacion.toString());
    body.set('fechaResena', resena.fechaResena);

    return this._http.put(`${this.urlAPI}/${id}`, body.toString(), { headers });
  }

  // Eliminar una reseña
  eliminarResena(id: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al eliminar la reseña con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
