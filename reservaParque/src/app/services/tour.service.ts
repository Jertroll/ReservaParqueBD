import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { server } from "./global";
import { Tour } from '../models/tour';
import { Observable,throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private urlAPI:string
  constructor(
      private _http:HttpClient
  ){
      this.urlAPI=server.url
  }
  crear(tour:Tour):Observable<any>{
    let tourJson=JSON.stringify(tour);
    let params='data='+tourJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'tour',params,options);
}
}
