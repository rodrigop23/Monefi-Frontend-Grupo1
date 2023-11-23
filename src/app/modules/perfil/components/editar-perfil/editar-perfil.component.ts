import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/http/usuario/usuario.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from 'src/app/shared/components/custom-snackbar/service/custom-snackbar.service';
import { FormValidator } from 'src/app/shared/util/validators/formValidator.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  ocultarPassword: boolean = true;

  loading: boolean = false;

  perfilForm: FormGroup = this.fb.group({
    var_nombres: ['', [Validators.required, Validators.minLength(3)]],
    var_apellidos: ['', [Validators.required, Validators.minLength(3)]],
    var_correo: [
      '',
      [
        Validators.required,
        Validators.pattern(this.formValidator.correoPatron),
      ],
    ],
    var_contrasena: ['', [Validators.required]],
  });

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private dialogService: CustomDialogService,
    private _snackbarService: CustomSnackbarService
  ) {}

  ngOnInit(): void {
    this.obtenerDatosPerfil();
  }

  obtenerDatosPerfil() {
    this.usuarioService.obtenerDatosPerfil().subscribe({
      next: (res) => {
        this.perfilForm.patchValue(res);
      },
    });
  }

  validarCampoFormulario(campo: string) {
    return this.formValidator.validarCampoFormulario(this.perfilForm, campo);
  }

  obtenerErrorCampoFormulario(campo: string) {
    return this.formValidator.errorCampoFormulario(this.perfilForm, campo);
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  onSubmit() {
    if (this.perfilForm.invalid) {
      return this.perfilForm.markAllAsTouched();
    }

    if (
      this.perfilForm.get('var_correo')?.pristine &&
      this.perfilForm.get('var_nombres')?.pristine &&
      this.perfilForm.get('var_apellidos')?.pristine
    ) {
      return this.abrirSnackbar(
        'warning',
        'No se detectaron cambios',
        'warning'
      );
    }

    const dialogRef = this.dialogService.loadDialog(
      '¿Desea actualizar sus datos?',
      'Al actualizar sus datos, estos se verán reflejados en su perfil automaticamente. Si estás seguro, haz clic en "Confirmar" de lo contrario, puedes cancelar esta acción.',
      true
    );

    dialogRef.subscribe((resp) => {
      if (resp) {
        this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
          next: (_) => {
            this.loading = true;

            this.formValidator.handleResponse(
              this.perfilForm,
              'Datos actualizados correctamente',
              '/perfil'
            );
          },
          error: (err) => {
            const { error } = err;

            if (error.invalidPassword) {
              this.perfilForm
                .get('var_contrasena')
                ?.setErrors({ invalidPassword: true });
            }
          },
        });
      }
    });
  }
}
