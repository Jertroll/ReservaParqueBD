import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./services/global";
import { Empleado } from "./models/Empleado";
import { Observable, throwError } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class EmpleadoService {
    private urlAPI: string;

    constructor(private _http: HttpClient) {
        this.urlAPI = server.url;
    }

    obtenerEmpleados(): Observable<{ status: number, message: string, data: Empleado[] }> {
        return this._http.get<{ status: number, message: string, data: Empleado[] }>(`${this.urlAPI}empleado`);
    }

    crearEmpleado(empleado: Empleado): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.urlAPI}empleado`, empleado, { headers });
    }

    actualizarEmpleado(empleado: Empleado): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${this.urlAPI}empleado/${empleado.idEmpleado}`, empleado, { headers });
    }

    eliminarEmpleado(idEmpleado: number): Observable<any> {
        return this._http.delete(`${this.urlAPI}empleado/${idEmpleado}`);
    }

    buscarEmpleadoPorId(idEmpleado: number): Observable<Empleado> {
        return this._http.get<{ status: number, message: string, empleado: Empleado }>(`${this.urlAPI}empleado/${idEmpleado}`)
            .pipe(
                map(response => response.empleado), // Extraer el objeto de empleado del cuerpo de la respuesta
                catchError(error => {
                    console.error('Error al buscar empleado por ID:', error);
                    return throwError(error); // Propagar el error
                })
            );
    }
}
