import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilMainComponent } from './components/perfil-main/perfil-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';

@NgModule({
  declarations: [
    PerfilMainComponent,
    EditarPerfilComponent,
    CambiarContrasenaComponent,
    NotificacionesComponent,
    EstadoCuentaComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PerfilModule {}
