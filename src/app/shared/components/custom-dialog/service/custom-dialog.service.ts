import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {
  componentRef!: MatDialogRef<CustomDialogComponent>;

  constructor(private dialog: MatDialog) {}

  loadDialog(
    titulo: string,
    mensaje: string,
    confirmar?: boolean
  ): Observable<boolean> {
    this.componentRef = this.dialog.open(CustomDialogComponent, {
      disableClose: true,
      backdropClass: 'custom-dialog-backdrop',
      data: {
        titulo,
        mensaje,
        confirmar,
      },
    });

    return this.componentRef.afterClosed();
  }
}
