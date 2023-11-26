import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomSnackbarService } from '../../components/custom-snackbar/service/custom-snackbar.service';

@Injectable({ providedIn: 'root' })
export class FormValidator {
  public correoPatron: string =
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private _snackbarService: CustomSnackbarService
  ) {}

  validarCampoFormulario(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  validarPasswordConfirmada(
    field1: string,
    field2: string
  ): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }

  errorCampoFormulario(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
          return `Máximo de ${errors['maxlength'].requiredLength} caracteres`;
        case 'pattern':
          return 'Correo electrónico inválido';
        case 'notEqual':
          return 'Las contraseñas no coinciden';
        case 'duplicate':
          return 'El correo ya se encuentra registrado';
        case 'notFound':
          return 'El correo no se encuentra registrado';
        case 'invalidPassword':
          return 'La contraseña ingresada es incorrecta';
        default:
          return 'Error desconocido';
      }
    }

    return null;
  }

  handleResponse(form: FormGroup, mensaje: string, path: string) {
    if (mensaje) {
      this._snackbarService.loadSnackBar('check_circle', mensaje, 'success');
    }

    setTimeout(() => {
      form.reset();

      this.router.navigateByUrl(path);
    }, 1250);
  }

  handleError(mensaje: string, path?: string) {
    this._snackbarService.loadSnackBar('error', mensaje, 'error');

    if (path) {
      this.router.navigateByUrl(path);
    }
  }
}
