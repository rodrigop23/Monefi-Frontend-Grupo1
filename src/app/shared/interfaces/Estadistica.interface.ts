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
