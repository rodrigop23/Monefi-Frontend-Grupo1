export interface Alerta {
  PK_alerta: number;
  num_monto: number;
  var_tipo: string;
  dte_fecha: string;
  bool_activo: boolean;
  nombre_tarjeta: string;
  FK_alerta_usuario: number;
  FK_alerta_tarjeta: number;
}
