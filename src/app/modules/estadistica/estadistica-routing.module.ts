import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticaMainComponent } from './components/estadistica-main/estadistica-main.component';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaRoutingModule {}
