import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';

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
    private snackbar: MatSnackBar
  ) {
    this.nombre = this.authService.usuario.var_nombre!;
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

          this.snackbar.open('Sesión cerrada correctamente', '', {
            panelClass: 'success-snackbar',
          });

          setTimeout(() => {
            this.authService.cerrarSesion();
          }, 1500);
        }
      });
  }
}
