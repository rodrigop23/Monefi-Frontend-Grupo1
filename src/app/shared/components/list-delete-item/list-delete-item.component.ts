import { Component, Input } from '@angular/core';
import { Transaccion } from '../../interfaces/Transaccion.interface';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from '../custom-snackbar/service/custom-snackbar.service';

@Component({
  selector: 'shared-list-delete-item',
  templateUrl: './list-delete-item.component.html',
  styleUrls: ['./list-delete-item.component.css'],
})
export class ListDeleteItemComponent {
  @Input() transaccion: Transaccion = {} as Transaccion;

  constructor(
    private transaccionService: TransaccionService,
    private _snackbarService: CustomSnackbarService
  ) {}

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  eliminarTransaccionAutomatica() {
    this.transaccionService
      .cancelarTransaccionAutomatica(this.transaccion.PK_transaccion)
      .subscribe({
        next: (resp) => {
          console.log(resp);

          this.abrirSnackbar(
            'check_circle',
            'Transacción cancelada con éxito',
            'success'
          );
        },
        error: (err) => {
          console.log(err);

          this.abrirSnackbar(
            'error',
            'Error al cancelar la transacción',
            'error'
          );
        },
      });
  }
}
