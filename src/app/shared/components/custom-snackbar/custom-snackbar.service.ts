import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  successSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2500,
      panelClass: ['success-snackbar'],
    });
  }

  errorSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2500,
      panelClass: ['error-snackbar'],
    });
  }
}
