import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionRoutingModule } from './transaccion-routing.module';
import { TransaccionMainComponent } from './components/transaccion-main/transaccion-main.component';
import { TransaccionRegistrarComponent } from './components/transaccion-registrar/transaccion-registrar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransaccionEditarComponent } from './components/transaccion-editar/transaccion-editar.component';

@NgModule({
  declarations: [
    TransaccionMainComponent,
    TransaccionRegistrarComponent,
    TransaccionEditarComponent,
  ],
  imports: [
    CommonModule,
    TransaccionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
  ],
})
export class TransaccionModule {}
