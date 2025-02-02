import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { server } from "./global";
import { Tour } from '../models/tour';
import { Observable,throwError } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.url
  }
  crear(tour: Tour): Observable<any> {
    let tourJson = JSON.stringify(tour);
    let params = 'data=' + encodeURIComponent(tourJson);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    console.log('Datos enviados al backend:', params); // Log de los datos enviados

    let options = {
        headers
    };

    return this._http.post(`${this.urlAPI}tour`, params, options);
}
verTours(): Observable<{ tours: Tour[] }> {
  return this._http.get<{ tours: Tour[] }>(`${this.urlAPI}tour`);
}

  obtenerTodosLosTours(): Observable<Tour[]> {
    return this._http.get<Tour[]>(`${this.urlAPI}tour`)
        .pipe(
            catchError(error => {
                console.error('Error fetching all tours:', error);
                return throwError(error);
            })
        );
}
uploadImage(formData: FormData): Observable<any> {
  return this._http.post<any>(this.urlAPI + 'tour/upload', formData);
}
  
  actualizarTour(tour: Tour): Observable<any> {
    let tourJson = JSON.stringify(tour);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    /*let options = {
      headers
    }*/
    const body = new URLSearchParams();

     body.set('nombre', tour.nombre);
     body.set('idParque', tour.idParque.toString());
     body.set('precio', tour.precio.toString());
     body.set('descripcion', tour.descripcion);
     body.set('horaInicio', tour.horaInicio.toString());
     body.set('duracion', tour.duracion.toString());

    return this._http.put(`${this.urlAPI}tour/${tour.idTour}`, body.toString(), { headers });
  }
  eliminarTour(id: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}tour/${id}`);
  }
  buscarNombre(nombre: string): Observable<any> {
    return this._http.get(`${this.urlAPI}tour/buscar/${nombre}`);
  }

  obtenerToursPorParque(nombreParque: string): Observable<any[]> {
        return this._http.get<any[]>(`${this.urlAPI}parques`, {
          params: { nombreParque }
        });
      }
      

}
