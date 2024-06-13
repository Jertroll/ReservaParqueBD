import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { server } from './global';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlAPI: string;

  constructor(
    private _http: HttpClient
  ){
    this.urlAPI = server.url;
  }

  crear(cliente:Cliente):Observable<any>{
    let clienteJson=JSON.stringify(cliente);
    let params='data='+clienteJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'cliente',params,options);
}

obtenerClientes(): Observable<{ status: number, message: string, data: Cliente[] }> {
    return this._http.get<{ status: number, message: string, data: Cliente[] }>(`${this.urlAPI}cliente`);
  }

  actualizarCliente(cliente: Cliente): Observable<any> {
    let clienteJson = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
      headers
    }
    const body = new URLSearchParams();

     body.set('nombre', cliente.nombre);
     body.set('apellido', cliente.apellido);
     body.set('cedula', cliente.cedula.toString());
     body.set('telefono', cliente.telefono.toString());



 return this._http.put(`${this.urlAPI}cliente/${cliente.idCliente}`, body.toString(), { headers });
}

  eliminarCliente(idCliente: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}cliente/${idCliente}`);
  }

  buscarClientePorId(idCliente: number): Observable<Cliente> {
    return this._http.get<{ status: number, message: string, cliente: Cliente }>(`${this.urlAPI}cliente/${idCliente}`)
      .pipe(
        map(response => response.cliente), // Extraer el objeto de producto del cuerpo de la respuesta
        catchError(error => {
          console.error('Error al buscar cliente por ID:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
}
