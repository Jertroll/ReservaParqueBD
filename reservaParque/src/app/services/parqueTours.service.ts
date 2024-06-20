import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ParqueToursService {
  private apiUrl = 'http://tu-dominio.com/api/parques';

  constructor(private http: HttpClient) { }

  obtenerParqueConTours(idParque: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idParque}/tours`);
  }
}
