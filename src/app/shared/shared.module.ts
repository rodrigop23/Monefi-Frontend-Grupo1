import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { CustomDialogService } from './components/custom-dialog/service/custom-dialog.service';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { RouterModule } from '@angular/router';
import { CustomTarjetaComponent } from './components/custom-tarjeta/custom-tarjeta.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddEditTarjetaComponent } from './components/add-edit-tarjeta/add-edit-tarjeta.component';
import { AddEditTransaccionComponent } from './components/add-edit-transaccion/add-edit-transaccion.component';
import { AddEditBeneficioComponent } from './components/add-edit-beneficio/add-edit-beneficio.component';

@NgModule({
  declarations: [
    CustomDialogComponent,
    DefaultButtonComponent,
    LoadingScreenComponent,
    HeaderComponent,
    CustomTarjetaComponent,
    ListItemComponent,
    AddEditTarjetaComponent,
    AddEditTransaccionComponent,
    AddEditBeneficioComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    CustomDialogComponent,
    DefaultButtonComponent,
    LoadingScreenComponent,
    HeaderComponent,
    CustomTarjetaComponent,
    ListItemComponent,
    AddEditTarjetaComponent,
    AddEditTransaccionComponent,
    AddEditBeneficioComponent,
  ],
  providers: [CustomDialogService],
})
export class SharedModule {}
