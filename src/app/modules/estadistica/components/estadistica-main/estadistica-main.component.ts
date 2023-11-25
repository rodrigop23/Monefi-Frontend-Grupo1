import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EstadisticaService } from 'src/app/core/services/http/estadistica/estadistica.service';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { LISTA_MESES } from 'src/app/shared/constants/Meses.constant';
import { Constant } from 'src/app/shared/interfaces/Constant.interface';
import {
  Categoria,
  TransaccionesEstadistica,
  TransaccionesPorMes,
} from 'src/app/shared/interfaces/Estadistica.interface';

interface TarjetaMenu {
  PK_tarjeta: number;
  var_nombre: string;
}

@Component({
  selector: 'app-estadistica-main',
  templateUrl: './estadistica-main.component.html',
  styleUrls: ['./estadistica-main.component.css'],
})
export class EstadisticaMainComponent implements OnInit {
  mesesLista: Constant[] = LISTA_MESES;

  idUsuario: number = 0;

  limiteTotal: number = 0;
  gastoAcumulado: number = 0;

  nuevoMes: number = new Date().getMonth() + 1;

  mesActual = new FormControl(this.nuevoMes, [Validators.required]);

  dataCategorias: Categoria[] = [];

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Gastos mensuales',
      },
    },
  };

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  } as ChartData<'pie', number[], string | string[]>;

  // ? Por Tarjeta

  idTarjeta: FormControl = new FormControl('', [Validators.required]);

  listaTarjetas: TarjetaMenu[] = [];

  gastoAcumuladoPorTarjeta: number = 0;

  dataCategoriaMensual: TransaccionesPorMes = {} as TransaccionesPorMes;

  dataCategoriaMensualArray: {
    mes: string;
    categoria: TransaccionesEstadistica[];
  }[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  constructor(
    private estadisticaService: EstadisticaService,
    private authService: AuthService,
    private tarjetaService: TarjetaService
  ) {
    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerEstadisticasMensuales();

    this.obtenerTarjetasPorUsuario();
  }

  obtenerEstadisticasMensuales() {
    this.estadisticaService
      .obtenerEstadisticasMensuales(this.idUsuario, this.mesActual.value!)
      .subscribe({
        next: (resp) => {
          this.pieChartData = resp.pieChartData;

          this.limiteTotal = resp.limiteTotal;
          this.gastoAcumulado = resp.gastoAcumulado;

          this.dataCategorias = resp.categorias;
        },
      });
  }

  cambioMes() {
    this.obtenerEstadisticasMensuales();
  }

  // ? Por Tarjeta

  obtenerTarjetasPorUsuario() {
    this.tarjetaService
      .obtenerTarjetas()
      .pipe(
        tap((resp) => {
          this.idTarjeta.setValue(resp[0].PK_tarjeta);
          this.obtenerEstadisticasPorTarjeta();
        })
      )
      .subscribe({
        next: (resp) => {
          this.listaTarjetas = resp;
        },
      });
  }

  obtenerEstadisticasPorTarjeta() {
    this.estadisticaService
      .obtenerEstadisticaPorTarjeta(this.idTarjeta.value)
      .subscribe({
        next: (resp) => {
          this.gastoAcumuladoPorTarjeta = resp.gastoAcumulado;

          this.barChartData = resp.barChartData;

          this.dataCategoriaMensual = resp.transaccionesPorMes;

          this.dataCategoriaMensualArray = Object.keys(
            this.dataCategoriaMensual
          ).map((mes) => ({ mes, categoria: this.dataCategoriaMensual[mes] }));
        },
      });
  }

  cambioTarjeta() {
    this.obtenerEstadisticasPorTarjeta();
  }
}
