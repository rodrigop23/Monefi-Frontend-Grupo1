import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
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
          console.log(resp);

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
