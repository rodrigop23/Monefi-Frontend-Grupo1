import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilMainComponent } from './components/perfil-main/perfil-main.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { AccesibilidadComponent } from './components/accesibilidad/accesibilidad.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilMainComponent,
  },
  {
    path: 'editar',
    component: EditarPerfilComponent,
  },
  {
    path: 'editar/password',
    component: CambiarContrasenaComponent,
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent,
  },
  {
    path: 'accesibilidad',
    component: AccesibilidadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
