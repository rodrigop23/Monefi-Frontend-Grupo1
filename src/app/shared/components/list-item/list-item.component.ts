import { Component, Input } from '@angular/core';
import { Transaccion } from '../../interfaces/Transaccion.interface';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import { CustomDialogService } from '../custom-dialog/service/custom-dialog.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from '../custom-snackbar/service/custom-snackbar.service';

@Component({
  selector: 'shared-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() transaccion: Transaccion = {} as Transaccion;

  constructor(
    private transaccionService: TransaccionService,
    private _snackbarService: CustomSnackbarService,
    private dialogService: CustomDialogService
  ) {}

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

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
          this.abrirSnackbar(
            'check_circle',
            'Transacción eliminada correctamente',
            'success'
          );
        },
      });
  }
}
