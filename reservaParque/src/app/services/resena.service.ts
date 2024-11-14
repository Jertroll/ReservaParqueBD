import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  // Cambiar a JSON

    console.log('Datos enviados al backend:', resena); // Log de los datos enviados

    return this._http.post(`${this.urlAPI}`, resena, { headers });  // Enviar datos directamente como JSON
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
  // Obtener reseñas por idParque
  obtenerResenasPorParque(idParque: number): Observable<Resena[]> {
    return this._http.get<Resena[]>(`${this.urlAPI}/parque/${idParque}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener reseñas para el parque con ID ${idParque}:`, error);
        return throwError(error);
      })
    );
  }
  // Actualizar una reseña existente
  actualizarResena(id: number, resena: Resena): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  // Cambiar a JSON

    return this._http.put(`${this.urlAPI}/${id}`, resena, { headers });
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
