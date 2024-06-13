import { Routes } from '@angular/router';

//componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ParqueAgregarComponent } from './components/parqueNacional/parque-agregar/parque-agregar.component';
import { AgregarTourComponent } from './components/Tour/agregar-tour/agregar-tour.component';
import { CrudTourComponent } from './components/Tour/crud-tour/crud-tour.component';
import { ParquerudComponent } from './components/parqueNacional/parquerud/parquerud.component';
import { ReservarComponent } from './components/reserva/reservar/reservar.component';
export const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'register', component:RegisterComponent},
{path: 'agregarParque', component:ParqueAgregarComponent},
{path: 'agregarTour', component:AgregarTourComponent},
{path: 'tours', component:CrudTourComponent},
{path:'reserva',component:ReservarComponent},

{path: "parqueRUD", component:ParquerudComponent}

];
