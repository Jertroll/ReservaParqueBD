import { Injectable } from '@angular/core';
import { server } from './global';
import { Empleado } from '../models/Empleado';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  obtenerEmpleados(): Observable<{
    status: number;
    message: string;
    data: Empleado[];
  }> {
    return this._http.get<{
      status: number;
      message: string;
      data: Empleado[];
    }>(`${this.urlAPI}empleados`);
  }

  crearEmpleados(empleado: Empleado): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Asegúrate de enviar todos los campos requeridos
    return this._http.post(this.urlAPI + 'empleados', empleado, { headers });
  }
  
  
  

  actualizarEmpleado(empleado: Empleado): Observable<any> {
    let empleadoJson = JSON.stringify(empleado);
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    /*let options = {
          headers
        }*/
    const body = new URLSearchParams();
    body.set('nombre', empleado.nombre.toString());
    body.set('apellido', empleado.apellido.toString());
    body.set('correo', empleado.correo.toString());
    body.set('contrasena', empleado.contrasena.toString());
    body.set('telefono', empleado.telefono.toString());


    return this._http.put(
      `${this.urlAPI}empleados/${empleado.idEmpleado}`,
      body.toString(),
      { headers }
    );
  }

  eliminarEmpleado(idEmpleado: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}empleados/${idEmpleado}`);
  }

  buscarEmpleadoPorId(idEmpleado: number): Observable<Empleado> {
    return this._http
      .get<{ status: number; message: string; empleado: Empleado }>(
        `${this.urlAPI}empleados/${idEmpleado}`
      )
      .pipe(
        map((response) => response.empleado), // Extraer el objeto de empleado del cuerpo de la respuesta
        catchError((error) => {
          console.error('Error al buscar empleado por ID:', error);
          return throwError(error); // Propagar el error
        })
      );
  }
}
