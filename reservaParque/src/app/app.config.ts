import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Importing client components
import { AgregarClienteComponent } from './components/client/agregar-client/agregar-client.component';
import { ClienteCrudComponent } from './components/client/cliente-crud/cliente-crud.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    AgregarClienteComponent, // Add AgregarClienteComponent to providers
    ClienteCrudComponent // Add ClienteCrudComponent to providers
  ]
};


