import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { server } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  crear(cliente: Cliente): Observable<any> {
    let clienteJson = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.urlAPI}cliente`, clienteJson, { headers });
  }

  getClientes(): Observable<{ status: number, message: string, data: Cliente[] }> {
    return this._http.get<{ status: number, message: string, data: Cliente[] }>(`${this.urlAPI}cliente`);
  }

  actualizarCliente(cliente: Cliente): Observable<any> {
    let clienteJson = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.urlAPI}cliente/${cliente.idCliente}`, clienteJson, { headers });
  }

  eliminarCliente(id: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}cliente/${id}`);
  }

  buscarCliente(nombre: string): Observable<any> {
    return this._http.get(`${this.urlAPI}cliente/buscar/${nombre}`);
  }
}
