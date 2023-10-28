import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './core/guards/validar-token.guard';
import { PreventLoggedInAccess } from './core/guards/prevent-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tarjeta',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PreventLoggedInAccess],
  },
  {
    path: 'tarjeta',
    loadChildren: () =>
      import('./modules/tarjeta/tarjeta.module').then((m) => m.TarjetaModule),
    canActivate: [ValidarTokenGuard],
  },
  {
    path: 'beneficio',
    loadChildren: () =>
      import('./modules/beneficio/beneficio.module').then(
        (m) => m.BeneficioModule
      ),
    canActivate: [ValidarTokenGuard],
  },
  {
    path: 'transaccion',
    loadChildren: () =>
      import('./modules/transaccion/transaccion.module').then(
        (m) => m.TransaccionModule
      ),
    canActivate: [ValidarTokenGuard],
  },
  {
    path: 'estadistica',
    loadChildren: () =>
      import('./modules/estadistica/estadistica.module').then(
        (m) => m.EstadisticaModule
      ),
    canActivate: [ValidarTokenGuard],
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./modules/perfil/perfil.module').then((m) => m.PerfilModule),
    canActivate: [ValidarTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'tarjeta',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
