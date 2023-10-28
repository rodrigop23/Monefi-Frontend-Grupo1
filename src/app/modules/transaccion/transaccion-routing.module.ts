import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionMainComponent } from './components/transaccion-main/transaccion-main.component';
import { TransaccionRegistrarComponent } from './components/transaccion-registrar/transaccion-registrar.component';
import { TransaccionEditarComponent } from './components/transaccion-editar/transaccion-editar.component';

const routes: Routes = [
  {
    path: '',
    component: TransaccionMainComponent,
  },
  {
    path: 'registrar',
    component: TransaccionRegistrarComponent,
  },
  {
    path: 'editar/:id',
    component: TransaccionEditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaccionRoutingModule {}
