import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroMainComponent } from './components/registro/registro-main/registro-main.component';
import { LoginMainComponent } from './components/login/login-main/login-main.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginMainComponent,
  },
  {
    path: 'registro',
    component: RegistroMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
