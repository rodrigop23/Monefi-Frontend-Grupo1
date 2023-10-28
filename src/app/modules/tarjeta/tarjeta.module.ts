import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaRoutingModule } from './tarjeta-routing.module';
import { TarjetaMainComponent } from './components/tarjeta-main/tarjeta-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material/material.module';
import { TarjetaRegistrarComponent } from './components/tarjeta-registrar/tarjeta-registrar.component';
import { TarjetaEditarComponent } from './components/tarjeta-editar/tarjeta-editar.component';
import { TarjetaDetalleComponent } from './components/tarjeta-detalle/tarjeta-detalle.component';

@NgModule({
  declarations: [
    TarjetaMainComponent,
    TarjetaRegistrarComponent,
    TarjetaEditarComponent,
    TarjetaDetalleComponent,
  ],
  imports: [
    CommonModule,
    TarjetaRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TarjetaModule {}
