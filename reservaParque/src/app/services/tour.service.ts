import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
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
  crear(tour:Tour):Observable<any>{
    let tourJson=JSON.stringify(tour);
    let params='data='+tourJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'tour',params,options);
  }
  verTours(): Observable<{ status: number, message: string, data: Tour[] }> {
      return this._http.get<{ status: number, message: string, data: Tour[] }>(`${this.urlAPI}tour`);
  }
  actualizarTour(tour: Tour): Observable<any> {
    let tourJson = JSON.stringify(tour);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    /*let options = {
      headers
    }*/
    const body = new URLSearchParams();

     body.set('fecha', tour.fecha.toString());
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
  buscarTour(id: number): Observable<Tour> {
    return this._http.get<{ status: number, message: string, tour: Tour }>(`${this.urlAPI}tour/${id}`)
      .pipe(
        map(response => response.tour), // Extraer el objeto de producto del cuerpo de la respuesta
        catchError(error => {
          console.error('Error al buscar tour por nombre:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
}
