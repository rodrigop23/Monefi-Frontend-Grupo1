import { ChartData } from 'chart.js';
import { Transaccion } from './Transaccion.interface';

export interface EstadisticaResponse {
  limiteTotal: number;
  categorias: Categoria[];
  gastoAcumulado: number;
  pieChartData: ChartData<'pie', number[], string | string[]>;
}

export interface Categoria {
  id: number;
  var_nombre: string;
  transaccion: Transaccion[];
  value: number;
}

export interface EstadisticaTarjetaResponse {
  transaccionesPorMes: TransaccionesPorMes;
  gastoAcumulado: number;
  barChartData: ChartData<'bar'>;
}

export interface TransaccionesPorMes {
  [mes: string]: TransaccionesEstadistica[];
}
export interface TransaccionesEstadistica {
  PK_transaccion: number;
  num_monto: number;
  dte_fecha: string;
  var_nombre: string;
  var_simbolo: string;
  mes: string;
}
