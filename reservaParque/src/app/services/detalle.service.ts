import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  crear(detalle: Detalle): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.urlAPI+'detalle', JSON.stringify(detalle), { headers: headers });
  }


  verDetalles(): Observable<{ status: number, message: string, data: Detalle[] }> {
    return this._http.get<{ status: number, message: string, data: Detalle[] }>(`${this.urlAPI}reserva`);
  }
  getReservasUsuario(idUsuario: number): Observable<{ status: number, message: string, data: any[] }> {
    return this._http.get<{ status: number, message: string, data: any[] }>(`${this.urlAPI}detalles/${idUsuario}`);
  }
  actualizarDetalle(detalle: Detalle): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(detalle);

    return this._http.put(`${this.urlAPI}detalle/${detalle.idDetalleReserva}`, body, { headers });
  }

  eliminarDetalle(id: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}detalle/${id}`);
  }
}
