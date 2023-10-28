import { Component, Input } from '@angular/core';
import { VisualizarTarjeta } from '../../interfaces/Tarjeta.interface';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { CustomDialogService } from '../custom-dialog/service/custom-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeneficioService } from 'src/app/core/services/http/beneficio/beneficio.service';

@Component({
  selector: 'shared-custom-tarjeta',
  templateUrl: './custom-tarjeta.component.html',
  styleUrls: ['./custom-tarjeta.component.css'],
})
export class CustomTarjetaComponent {
  @Input() tarjeta: VisualizarTarjeta = {} as VisualizarTarjeta;
  @Input() menu: boolean = false;

  constructor(
    private tarjetaService: TarjetaService,
    private dialogService: CustomDialogService,
    private snackbar: MatSnackBar,
    private beneficioService: BeneficioService
  ) {}

  abrirDialogoEliminarTarjeta() {
    this.dialogService
      .loadDialog(
        `¿Desea eliminar la tarjeta ${this.tarjeta.var_nombre}?`,
        "Se eliminará esta tarjeta y todas las transacciones relacionadas. Si estás seguro, haz clic en 'Confirmar' de lo contrario, puedes cancelar esta acción.",
        true
      )
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.eliminarTarjeta();
          }
        },
      });
  }

  eliminarTarjeta() {
    this.tarjetaService.eliminarTarjeta(this.tarjeta.PK_tarjeta).subscribe({
      next: () => {
        this.snackbar.open('Tarjeta eliminada correctamente', '', {
          panelClass: 'success-snackbar',
        });
      },
    });
  }

  abrirDialogoEliminarBeneficio() {
    this.dialogService
      .loadDialog(
        `¿Desea eliminar el beneficio?`,
        "Se eliminará esta beneficio y todo lo acumulado hasta el momento. Si estás seguro, haz clic en 'Confirmar' de lo contrario, puedes cancelar esta acción.",
        true
      )
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.eliminarBeneficio();
          }
        },
      });
  }

  eliminarBeneficio() {
    this.beneficioService
      .eliminarBeneficio(this.tarjeta.FK_beneficio!)
      .subscribe({
        next: () => {
          this.snackbar.open('Beneficio eliminado correctamente', '', {
            panelClass: 'success-snackbar',
          });
        },
      });
  }
}
