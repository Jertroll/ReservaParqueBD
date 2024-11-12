import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//import { RegisterComponent } from './components/register/register.component';
import { ParqueAgregarComponent } from './components/parqueNacional/parque-agregar/parque-agregar.component';
import { AgregarTourComponent } from './components/Tour/agregar-tour/agregar-tour.component';
import { CrudTourComponent } from './components/Tour/crud-tour/crud-tour.component';
import { ParquerudComponent } from './components/parqueNacional/parquerud/parquerud.component';
import { EmpleadoCreateComponent } from './components/empleado/empleado-create/empleado-create.component';
import { EmpleadoUpComponent } from './components/empleado/empleadoup/empleadoup.component';
import { ReservarComponent } from './components/reserva/reservar/reservar.component';
import { AdminComponent } from './components/Admin/admin.component';
import { CrudUsuarioComponent } from './components/usuario/crud-usuario/crud-usuario.component';
import { AgregarUsuarioComponent } from './components/usuario/agregar-usuario/agregar-usuario.component';
import { ToursParqueComponent } from './components/parques/tours-parque/tours-parque.component'; 
import { ClienteComponent } from './components/usuario/Cliente/cliente/cliente.component';

export const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
//{path: 'register', component:RegisterComponent},
{path: 'agregarParque', component:ParqueAgregarComponent},
{path: 'agregarTour', component:AgregarTourComponent},
{path: 'tours', component:CrudTourComponent},
{path: 'agregarEmpleado', component:EmpleadoCreateComponent},
{path: 'parques/:idParque/tours', component: ToursParqueComponent },
{path: 'agregarCliente', component:ClienteComponent},



{path: "parqueRUD", component:ParquerudComponent},
{path: "empleadosTable", component:EmpleadoUpComponent},
{path:'reserva',component:ReservarComponent},
{path: 'agregarUsuario', component:AgregarUsuarioComponent},
{ path: 'usuariosTable', component: CrudUsuarioComponent },
{ path: 'Admin', component: AdminComponent },
{path: "parqueRUD", component:ParquerudComponent}

];
