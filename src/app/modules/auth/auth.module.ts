import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistroFormComponent } from './components/registro/registro-form/registro-form.component';
import { RegistroMainComponent } from './components/registro/registro-main/registro-main.component';
import { LoginMainComponent } from './components/login/login-main/login-main.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';

@NgModule({
  declarations: [RegistroFormComponent, RegistroMainComponent, LoginMainComponent, LoginFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
