import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsuarioService } from 'src/app/core/services/http/usuario/usuario.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from 'src/app/shared/components/custom-snackbar/service/custom-snackbar.service';
import { FormValidator } from 'src/app/shared/util/validators/formValidator.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
})
export class CambiarContrasenaComponent {
  ocultarActual: boolean = true;
  ocultarNueva: boolean = true;

  loading: boolean = false;

  contrasenaForm: FormGroup = this.fb.group(
    {
      var_contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      var_contrasena_nueva: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      var_confirmar_nueva: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    },
    {
      validators: this.formValidator.validarPasswordConfirmada(
        'var_contrasena_nueva',
        'var_confirmar_nueva'
      ),
    } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private formValidator: FormValidator,
    private _snackbarService: CustomSnackbarService,
    private authService: AuthService,
    private dialogService: CustomDialogService
  ) {}

  validarCampoFormulario(campo: string) {
    return this.formValidator.validarCampoFormulario(
      this.contrasenaForm,
      campo
    );
  }

  obtenerErrorCampoFormulario(campo: string) {
    return this.formValidator.errorCampoFormulario(this.contrasenaForm, campo);
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  onSubmit() {
    if (this.contrasenaForm.invalid) {
      return this.contrasenaForm.markAllAsTouched();
    }

    const dialogRef = this.dialogService.loadDialog(
      '¿Estás seguro de que quieres cambiar tu contraseña?',
      'Al actualizar su contraseña deberá volver a iniciar sesión. Si estás seguro, haz clic en "Confirmar" de lo contrario, puedes cancelar esta acción.',
      true
    );

    dialogRef.subscribe((res) => {
      if (res) {
        this.usuarioService
          .actualizarContrasena(this.contrasenaForm.value)
          .subscribe({
            next: (_) => {
              this.loading = true;

              this.abrirSnackbar(
                'check_circle',
                'Contraseña actualizada exitosamente',
                'success'
              );

              setTimeout(() => {
                this.authService.cerrarSesion();
              }, 1500);
            },
            error: (err) => {
              const { error } = err;

              if (error.invalidPassword) {
                this.contrasenaForm
                  .get('var_contrasena')
                  ?.setErrors({ invalidPassword: true });
              }
            },
          });
      }
    });
  }
}
