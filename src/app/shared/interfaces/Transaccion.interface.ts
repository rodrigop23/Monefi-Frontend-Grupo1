export interface Transaccion {
  PK_transaccion: number;
  var_nombre: string;
  dte_fecha: string;
  var_simbolo: string;
  num_monto: number;
}

export interface TransaccionCompleta {
  PK_transaccion: number;
  var_tipo: string;
  num_monto: number;
  var_nombre: string;
  dte_fecha: string;
  FK_transaccion_categoria: number;
  FK_transaccion_moneda: number;
  FK_transaccion_tarjeta: number;
}
