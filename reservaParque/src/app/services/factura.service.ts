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


    buscarFacturaPorId(idFactura: number): Observable<Factura> {
        return this._http.get<{ status: number, message: string, factura: Factura }>(`${this.urlAPI}factura/${idFactura}`)
          .pipe(
            map(response => response.factura), // Extraer el objeto de producto del cuerpo de la respuesta
            catchError(error => {
              console.error('Error al buscar factura por ID:', error);
              return throwError(error); // Propagar el error
            })
          );
      }

      crear(idReserva: number, factura: Factura): Observable<any> {
        factura.idReserva = idReserva;
        let facturaJson = JSON.stringify(factura);
        let params = 'data=' + facturaJson;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers
        }
        return this._http.post(this.urlAPI + 'factura', params, options);
    }


    
}
