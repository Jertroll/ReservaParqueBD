import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.url
  }
 
  crear(reserva: Reserva): Observable<any> {
    return this._http.post<any>(`${this.urlAPI}reserva`, reserva);
  }
  verReservas(): Observable<{ status: number, message: string, data: Reserva[] }> {
    return this._http.get<{ status: number, message: string, data: Reserva[] }>(`${this.urlAPI}reserva`);
  }
  verEmpleados(): Observable<{ status: number, message: string, data: Reserva[] }> {
    return this._http.get<{ status: number, message: string, data: Reserva[] }>(`${this.urlAPI}empleados`);
  }
  actualizarTour(reserva: Reserva): Observable<any> {
  let tourJson = JSON.stringify(reserva);
  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  /*let options = {
    headers
  }*/
  const body = new URLSearchParams();
   body.set('idCliente', reserva.idCliente.toString());

  return this._http.put(`${this.urlAPI}reserva/${reserva.idCliente}`, body.toString(), { headers });
  }
  eliminarTour(id: number): Observable<any> {
  return this._http.delete(`${this.urlAPI}reserva/${id}`);
  }

}
