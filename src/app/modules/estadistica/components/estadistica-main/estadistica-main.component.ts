import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EstadisticaService } from 'src/app/core/services/http/estadistica/estadistica.service';
import { LISTA_MESES } from 'src/app/shared/constants/Meses.constant';
import { Constant } from 'src/app/shared/interfaces/Constant.interface';
import { Categoria } from 'src/app/shared/interfaces/Estadistica.interface';

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

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }],
  };

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

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

  constructor(
    private estadisticaService: EstadisticaService,
    private authService: AuthService
  ) {
    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerEstadisticasMensuales();
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
}
