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
import { MostrarReservaComponent } from './components/reserva/mostrar-reserva/mostrar-reserva.component';
import { AdminComponent } from './components/Admin/admin.component';
import { CrudUsuarioComponent } from './components/usuario/crud-usuario/crud-usuario.component';
import { AgregarUsuarioComponent } from './components/usuario/agregar-usuario/agregar-usuario.component';
//import { ToursParqueComponent } from './components/parques/tours-parque/tours-parque.component'; 
import { ClienteComponent } from './components/usuario/Cliente/cliente/cliente.component';
import { DetallesUsuarioComponent } from './components/detalles/detalles-usuario/detalles-usuario.component';
import { FacturasUsuarioComponent } from './components/factura/facturas-usuario/facturas-usuario.component';
import { FacturacliComponent } from './components/factura/facturacli/facturacli.component';
import { ResenaAgregarComponent } from './components/resena/resena-agregar/resena-agregar.component';
import { VerParquesComponent } from './components/parqueNacional/ver-parques/ver-parques.component';
import { GuiaComponent } from './components/Guia/guia.componet';
import { VisReservasComponent } from './components/reserva/visualizacionReservas/visReservas.component';


export const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
//{path: 'register', component:RegisterComponent},
{path: 'agregarParque', component:ParqueAgregarComponent},
{path: 'agregarTour', component:AgregarTourComponent},
{path: 'tours', component:CrudTourComponent},
{path: 'agregarEmpleado', component:EmpleadoCreateComponent},
//{path: 'parques/:idParque/tours', component: ToursParqueComponent },
{path: 'agregarCliente', component:ClienteComponent},
{path: "parqueRUD", component:ParquerudComponent},
{path: "resenaAgregar", component:ResenaAgregarComponent},
{path: "empleadosTable", component:EmpleadoUpComponent},
{path:'reserva',component:ReservarComponent},
{path:'reservas-usuarios',component:MostrarReservaComponent},
{path:'detallesUsuario',component:DetallesUsuarioComponent},
{path: 'agregarUsuario', component:AgregarUsuarioComponent},
{ path: 'usuariosTable', component: CrudUsuarioComponent },
{ path: 'Admin', component: AdminComponent },
{path:'FacturasUsuarios',component:FacturasUsuarioComponent},
{path:'Facturas',component:FacturacliComponent},
{path:'ParquesTours',component:VerParquesComponent},
{path: "parqueRUD", component:ParquerudComponent},
{path: "Guia", component:GuiaComponent},
{path: "visReservas", component:VisReservasComponent}

];
