export interface Tarjeta {
  PK_tarjeta: number;
  var_tipo: string;
  var_nombre: string;
  dte_inicio_facturacion?: Date;
  dte_fin_facturacion?: Date;
  dte_dia_pago?: Date;
  num_lim_gasto?: number;
  FK_tarjeta_entidad: number;
  FK_tarjeta_moneda: number;
}

export interface VisualizarTarjeta {
  PK_tarjeta: number;
  var_nombre: string;
  var_tipo: string;
  FK_tarjeta_moneda: number;
  nombre_moneda: string;
  simbolo_moneda: string;
  total_transacciones: number;
  FK_beneficio: number | null;
}
