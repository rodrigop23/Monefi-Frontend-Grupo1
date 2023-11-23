import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/http/usuario/usuario.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormControl } from '@angular/forms';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from 'src/app/shared/components/custom-snackbar/service/custom-snackbar.service';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css'],
})
export class EstadoCuentaComponent implements OnInit {
  correoUsuario: string = '';

  isChecked: FormControl = new FormControl(false);

  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private dialogService: CustomDialogService,
    private authService: AuthService,
    private _snackbarService: CustomSnackbarService
  ) {}

  ngOnInit(): void {
    this.obtenerDataUsuario();
  }

  obtenerDataUsuario() {
    this.usuarioService.obtenerDatosPerfil().subscribe((res) => {
      this.correoUsuario = res.var_correo;
    });
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  cargarDialog(titulo: string, mensaje: string, confirmar: boolean) {
    const dialogRef = this.dialogService.loadDialog(titulo, mensaje, confirmar);

    return dialogRef;
  }

  guardarCambios() {
    if (!this.isChecked.value) {
      return this.abrirSnackbar(
        'warning',
        'No se detectaron cambios',
        'warning'
      );
    }

    const dialogRef = this.cargarDialog(
      '¿Desea deshabilitar su cuenta?',
      'Su cuenta se deshabilitará por 30 días. Si estás seguro, haz clic en "Confirmar" de lo contrario, puedes cancelar esta acción.',
      true
    );

    dialogRef.subscribe((resp) => {
      if (resp) {
        this.usuarioService.deshabilitarCuenta().subscribe({
          next: (_) => {
            this.loading = true;

            this.abrirSnackbar(
              'check_circle',
              'Cuenta deshabilitada correctamente',
              'success'
            );

            setTimeout(() => {
              this.authService.cerrarSesion();
            }, 1500);
          },
        });
      }
    });
  }

  eliminarCuenta() {
    const dialogRef = this.cargarDialog(
      '¿Desea eliminar su cuenta?',
      'Esta acción no se puede deshacer. Si estás seguro, haz clic en "Confirmar" de lo contrario, puedes cancelar esta acción.',
      true
    );

    dialogRef.subscribe((resp) => {
      if (resp) {
        this.usuarioService.eliminarCuenta().subscribe({
          next: (_) => {
            this.loading = true;

            this.abrirSnackbar(
              'check_circle',
              'Cuenta eliminada exitosamente',
              'success'
            );

            setTimeout(() => {
              this.authService.cerrarSesion();
            }, 1500);
          },
        });
      }
    });
  }
}
