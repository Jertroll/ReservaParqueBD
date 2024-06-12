import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parque } from '../../../models/parque';
import { timer } from 'rxjs';
import { ParqueService } from '../../../services/parque.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute,Route } from '@angular/router';


@Component({
  selector: 'app-parque-agregar',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './parque-agregar.component.html',
  styleUrl: './parque-agregar.component.css'
})
export class ParqueAgregarComponent {

  public status:number;
  public parque:Parque;
  constructor( private _parqueService:ParqueService)
  {
    this.status=-1;
    this.parque = new Parque(0,"","","","","","",0);
  }
  onSubmit(form:any){
    this._parqueService.crear(this.parque).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status==200){
          form.reset();            
          this.changeStatus(0);
        }else{
          this.changeStatus(1);
        }
      },
      error:(error:Error)=>{
        this.changeStatus(2);
      }
    })
  }
  changeStatus(st:number){
    this.status=st;
    let countdown=timer(5000);
    countdown.subscribe(n=>{
      this.status=-1;
    })
  }
}
