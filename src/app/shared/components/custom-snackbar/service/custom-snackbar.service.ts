import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar.component';

export type TipoSnackbar =
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'notification';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackbarService {
  constructor(private _snackbar: MatSnackBar) {}

  loadSnackBar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      data: { icono, mensaje },
      panelClass: `${tipo}-snackbar`,
      verticalPosition: tipo === 'notification' ? 'top' : 'bottom',
      duration: tipo === 'notification' ? 5000 : 2000,
    });
  }
}
