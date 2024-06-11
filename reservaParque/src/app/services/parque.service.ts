import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Parque } from "../models/parque";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ParqueService{
    private urlAPI:string
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url
    }

    obtenerParques(): Observable<{ status: number, message: string, data: Parque[] }> {
        return this._http.get<{ status: number, message: string, data: Parque[] }>(`${this.urlAPI}parque`);
    }

    crear(parque:Parque):Observable<any>{
        let parqueJson=JSON.stringify(parque);
        let params='data='+parqueJson;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let options={
            headers
        }
        return this._http.post(this.urlAPI+'parque',params,options);
    }


    actualizarParque(parque: Parque): Observable<any> {
        let parqueJson = JSON.stringify(parque);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
          headers
        }
        const body = new URLSearchParams();
    
         body.set('nombre', parque.nombre);
         body.set('ubicacion', parque.ubicacion);
         body.set('descripcion', parque.descripcion);
         body.set('tipoBosque', parque.tipoBosque);
         body.set('tipoClima', parque.tipoClima);
         body.set('correo', parque.correo);
         body.set('telefono', parque.telefono.toString());



     return this._http.put(`${this.urlAPI}parque/${parque.idParque}`, body.toString(), { headers });
    }

    
    eliminarParque(idParque: number): Observable<any> {
        return this._http.delete(`${this.urlAPI}parque/${idParque}`);
    }
}