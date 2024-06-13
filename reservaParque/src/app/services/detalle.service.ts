import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.url
  }
  crear(detalle:Detalle):Observable<any>{
    let reservaJson=JSON.stringify(detalle);
    let params='data='+reservaJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'reserva',params,options);
  }

  verDetalles(): Observable<{ status: number, message: string, data: Detalle[] }> {
    return this._http.get<{ status: number, message: string, data: Detalle[] }>(`${this.urlAPI}reserva`);
  }
  actualizarDetalle(detalle: Detalle): Observable<any> {
  let detalleJson = JSON.stringify(detalle);
  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  /*let options = {
    headers
  }*/
  const body = new URLSearchParams();
    body.set('idReserva', detalle.idReserva.toString());
    body.set('tour', detalle.tour.toString());
    body.set('fechaTour', detalle.fechaTour);
    body.set('horaTour', detalle.horaTour);
    body.set('idEmpleado', detalle.idEmpleado.toString());
    body.set('cantVisitantes', detalle.cantVisitantes.toString());
    body.set('precioUnitario', detalle.precioUnitario.toString());
    body.set('subTotal', detalle.subTotal.toString());


  return this._http.put(`${this.urlAPI}reserva/${detalle.idDetalleReserva}`, body.toString(), { headers });
  }
  eliminarDetalle(id: number): Observable<any> {
  return this._http.delete(`${this.urlAPI}reserva/${id}`);
  }
}
