import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficioRoutingModule } from './beneficio-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/core/material/material.module';

import { BeneficioRegistrarComponent } from './components/beneficio-registrar/beneficio-registrar.component';
import { BeneficioEditarComponent } from './components/beneficio-editar/beneficio-editar.component';

@NgModule({
  declarations: [BeneficioRegistrarComponent, BeneficioEditarComponent],
  imports: [CommonModule, BeneficioRoutingModule, SharedModule, MaterialModule],
})
export class BeneficioModule {}
