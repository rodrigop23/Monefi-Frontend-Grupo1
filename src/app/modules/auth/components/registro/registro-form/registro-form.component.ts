import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import { FormValidator } from 'src/app/shared/util/validators/formValidator.service';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css'],
})
export class RegistroFormComponent {
  ocultarPrimero: boolean = true;
  loading: boolean = false;

  registroForm: FormGroup = this.fb.group(
    {
      var_nombres: ['', [Validators.required]],
      var_apellidos: ['', [Validators.required]],
      var_correo: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formValidator.correoPatron),
        ],
      ],
      var_contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      var_confirmar_contrasena: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    },
    {
      validators: [
        this.formValidator.validarPasswordConfirmada(
          'var_contrasena',
          'var_confirmar_contrasena'
        ),
      ],
    } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private dialog: CustomDialogService,
    private authService: AuthService,
    private formValidator: FormValidator
  ) {}

  abrirDialogoTerminos() {
    this.dialog.loadDialog(
      'Términos y Condiciones',
      'Es necesario tener la edad mínima para usar nuestro servicio, la propiedad de tu contenido, nuestra política de privacidad, la posibilidad de cambios en los términos, y nuestra facultad de terminar el acceso al servicio si es necesario, además de detalles legales. Se recomienda revisarlos periódicamente y obtener asesoramiento legal si es necesario.',
      false
    );
  }

  validarCamposFormulario(campo: string) {
    return this.formValidator.validarCampoFormulario(this.registroForm, campo);
  }

  obtenerErrorCampoFormulario(campo: string) {
    return this.formValidator.errorCampoFormulario(this.registroForm, campo);
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.authService.registrarUsuario(this.registroForm.value).subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.loading = true;

          this.formValidator.handleResponse(
            this.registroForm,
            'Registro exitoso',
            '/'
          );
        }
      },
      error: (err) => {
        const { error } = err;

        if (error.duplicate) {
          this.registroForm.controls['var_correo'].setErrors({
            duplicate: true,
          });
        }
      },
    });
  }
}
