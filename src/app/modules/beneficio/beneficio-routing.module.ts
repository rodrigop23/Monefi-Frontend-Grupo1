import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioRegistrarComponent } from './components/beneficio-registrar/beneficio-registrar.component';
import { BeneficioEditarComponent } from './components/beneficio-editar/beneficio-editar.component';

const routes: Routes = [
  {
    path: 'registrar/:id',
    component: BeneficioRegistrarComponent,
  },
  {
    path: 'editar/:id',
    component: BeneficioEditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficioRoutingModule {}
