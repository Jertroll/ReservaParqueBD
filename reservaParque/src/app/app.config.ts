import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

// Importando componentes del cliente
import { AgregarClienteComponent } from './components/client/agregar-client/agregar-client.component';
import { ClienteCrudComponent } from './components/client/cliente-crud/cliente-crud.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    importProvidersFrom(RouterModule), // Asegúrate de incluir RouterModule
    AgregarClienteComponent,
    ClienteCrudComponent
  ]
};
