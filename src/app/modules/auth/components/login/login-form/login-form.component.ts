import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormValidator } from 'src/app/shared/util/validators/formValidator.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loading: boolean = false;
  ocultarPrimero: boolean = true;

  loginForm: FormGroup = this.fb.group({
    var_correo: [
      '',
      [
        Validators.required,
        Validators.pattern(this.formValidator.correoPatron),
      ],
    ],
    var_contrasena: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(12)],
    ],
    recordar: [false],
  });

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private authService: AuthService
  ) {}

  validarCamposFormulario(campo: string) {
    return this.formValidator.validarCampoFormulario(this.loginForm, campo);
  }

  obtenerErrorCampoFormulario(campo: string) {
    return this.formValidator.errorCampoFormulario(this.loginForm, campo);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.iniciarSesion(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.ok) {
          this.loading = true;

          this.formValidator.handleResponse(
            this.loginForm,
            'Inicio de sesión exitoso',
            '/'
          );
        }
      },
      error: (err) => {
        const { error } = err;

        if (error.notFound) {
          this.loginForm.controls['var_correo'].setErrors({ notFound: true });
          return;
        }

        if (error.invalidPassword) {
          this.loginForm.controls['var_contrasena'].setErrors({
            invalidPassword: true,
          });
        }
      },
    });
  }
}
