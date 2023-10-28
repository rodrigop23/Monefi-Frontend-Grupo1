import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaMainComponent } from './components/tarjeta-main/tarjeta-main.component';
import { TarjetaRegistrarComponent } from './components/tarjeta-registrar/tarjeta-registrar.component';
import { TarjetaDetalleComponent } from './components/tarjeta-detalle/tarjeta-detalle.component';
import { TarjetaEditarComponent } from './components/tarjeta-editar/tarjeta-editar.component';

const routes: Routes = [
  {
    path: '',
    component: TarjetaMainComponent,
  },
  {
    path: 'registrar',
    component: TarjetaRegistrarComponent,
  },
  {
    path: 'detalle/:id',
    component: TarjetaDetalleComponent,
  },
  {
    path: 'editar/:id',
    component: TarjetaEditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetaRoutingModule {}
