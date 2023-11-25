import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExceljsService } from 'src/app/core/services/exceljs/exceljs.service';
import { BeneficioService } from 'src/app/core/services/http/beneficio/beneficio.service';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { ObserverService } from 'src/app/core/services/observer/observer.service';
import { CustomDialogService } from 'src/app/shared/components/custom-dialog/service/custom-dialog.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from 'src/app/shared/components/custom-snackbar/service/custom-snackbar.service';
import { VisualizarTarjeta } from 'src/app/shared/interfaces/Tarjeta.interface';
import { Transaccion } from 'src/app/shared/interfaces/Transaccion.interface';

@Component({
  selector: 'app-tarjeta-detalle',
  templateUrl: './tarjeta-detalle.component.html',
  styleUrls: ['./tarjeta-detalle.component.css'],
})
export class TarjetaDetalleComponent implements OnInit {
  dataTarjeta: VisualizarTarjeta = {} as VisualizarTarjeta;
  dataTransacciones: Transaccion[] = [];

  dataTarjetaBeneficios: VisualizarTarjeta = {} as VisualizarTarjeta;
  dataBeneficios: Transaccion[] = [];

  idTarjeta: number = 0;

  constructor(
    private router: ActivatedRoute,
    private tarjetaService: TarjetaService,
    private observerService: ObserverService,
    private dialogService: CustomDialogService,
    private excelService: ExceljsService,
    private _snackbarService: CustomSnackbarService,
    private beneficioService: BeneficioService
  ) {
    this.idTarjeta = this.router.snapshot.paramMap.get(
      'id'
    ) as unknown as number;
  }

  ngOnInit(): void {
    this.obtenerDataTarjeta();

    this.obtenerDataBeneficiosAcumulados();

    this.observerService.refresh$.subscribe({
      next: () => {
        this.obtenerDataTarjeta();

        this.obtenerDataBeneficiosAcumulados();
      },
    });
  }

  obtenerDataTarjeta() {
    this.tarjetaService.obtenerHistorialPorIdTarjeta(this.idTarjeta).subscribe({
      next: (resp) => {
        this.dataTarjeta = resp.tarjeta;
        this.dataTransacciones = resp.transacciones;
      },
    });
  }

  obtenerDataBeneficiosAcumulados() {
    this.beneficioService
      .obtenerBeneficiosPorTransaccion(this.idTarjeta)
      .subscribe({
        next: (resp) => {
          this.dataTarjetaBeneficios = resp.tarjeta;
          this.dataBeneficios = resp.transacciones;
        },
      });
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  descargarTransacciones() {
    const dialogRef = this.dialogService.loadDialog(
      '¿Desea descargar el historial de transacciones de este mes?',
      "Se descargará un archivo excel con el historial de transacciones de la tarjeta seleccionada. Si desea continuar y descargarlo, presione el botón 'Confirmar'.",
      true
    );

    dialogRef.subscribe((res) => {
      if (res) {
        this.tarjetaService.excelHistorialPorTarjeta(this.idTarjeta).subscribe({
          next: (resp) => {
            if (resp.length === 0) {
              this.abrirSnackbar(
                'error',
                'No hay transacciones para descargar',
                'error'
              );
            }

            this.excelService.excelTarjeta(resp);

            this.abrirSnackbar(
              'check_circle',
              'Excel descargado correctamente',
              'success'
            );
          },
        });
      }
    });
  }
}
