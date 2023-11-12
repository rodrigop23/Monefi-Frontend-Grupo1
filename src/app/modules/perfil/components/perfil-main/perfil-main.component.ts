import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from 'src/app/shared/components/custom-snackbar/service/custom-snackbar.service';

@Component({
  selector: 'app-perfil-main',
  templateUrl: './perfil-main.component.html',
  styleUrls: ['./perfil-main.component.css'],
})
export class PerfilMainComponent {
  nombre: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private dialogService: CustomDialogService,
    private snackbar: MatSnackBar,
    private _snackbarService: CustomSnackbarService
  ) {
    this.nombre = this.authService.usuario.var_nombre!;
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  cerrarSesion() {
    this.dialogService
      .loadDialog(
        '¿Desea cerrar sesión?',
        "Se desconectará tu cuenta y deberás volver a iniciar sesión para acceder nuevamente. Si estás seguro, haz clic en 'Confirmar' de lo contrario, puedes cancelar esta acción.",
        true
      )
      .subscribe((resp) => {
        if (resp) {
          this.loading = true;

          this.abrirSnackbar(
            'check_circle',
            'Sesión cerrada correctamente',
            'success'
          );

          setTimeout(() => {
            this.authService.cerrarSesion();
          }, 1500);
        }
      });
  }
}
