import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { server } from "./global";
import { Factura } from "../models/factura";
import { Observable, throwError } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class FacturaService{
    private urlAPI:string
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url
    }

    obteneracturas(): Observable<{ status: number, message: string, data: Factura[] }> {
        return this._http.get<{ status: number, message: string, data: Factura[] }>(`${this.urlAPI}factura`);
    }


    mostrarFactura(idFactura: number): Observable<Factura> {
        return this._http.get<{ status: number, message: string, factura: Factura }>(`${this.urlAPI}factura/${idFactura}`)
          .pipe(
            map(response => response.factura), // Extraer el objeto de producto del cuerpo de la respuesta
            catchError(error => {
              console.error('Error al buscar factura por ID:', error);
              return throwError(error); // Propagar el error
            })
          );
      }
      getAllFacturas(): Observable<any> {
        return this._http.get<any>(`${this.urlAPI}factura/`);
    }
        
      crear(idReserva: number): Observable<any> {
        let body = { idReserva };
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.urlAPI + 'factura', body, { headers });
    }
    
    getFacturasPorUsuario(idUsuario: number): Observable<any> {
        return this._http.get(`${this.urlAPI}facturasUsuarios/${idUsuario}`);
      }

    
}
