import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { EstadisticaMainComponent } from './components/estadistica-main/estadistica-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [EstadisticaMainComponent],
  imports: [
    CommonModule,
    EstadisticaRoutingModule,
    NgChartsModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class EstadisticaModule {}
