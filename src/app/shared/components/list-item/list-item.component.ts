import { Component, Input } from '@angular/core';
import { Transaccion } from '../../interfaces/Transaccion.interface';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomDialogService } from '../custom-dialog/service/custom-dialog.service';

@Component({
  selector: 'shared-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() transaccion: Transaccion = {} as Transaccion;

  constructor(
    private transaccionService: TransaccionService,
    private snackbar: MatSnackBar,
    private dialogService: CustomDialogService
  ) {}

  abrirDialogoEliminar() {
    this.dialogService
      .loadDialog(
        `¿Desea eliminar la transacción ${this.transaccion.var_nombre}?`,
        "Se eliminará esta transacción y no figurará más en el historial. Si estás seguro, haz clic en 'Confirmar' de lo contrario, puedes cancelar esta acción.",
        true
      )
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.eliminarTransaccion();
          }
        },
      });
  }

  eliminarTransaccion() {
    this.transaccionService
      .eliminarTransaccion(this.transaccion.PK_transaccion)
      .subscribe({
        next: () => {
          this.snackbar.open('Transacción eliminada correctamente', '', {
            panelClass: 'success-snackbar',
          });
        },
      });
  }
}
