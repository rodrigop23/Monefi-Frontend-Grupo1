import { Beneficio } from './Beneficio.interface';
import { Dropdown } from './Dropdown.interface';
import { Tarjeta, VisualizarTarjeta } from './Tarjeta.interface';
import { Transaccion } from './Transaccion.interface';

export interface BasicResponse {
  ok: boolean;
  message: string;
}

export interface TransaccionResponse extends BasicResponse {
  superoLimite: boolean;
  cercaLimite: boolean;
  monto: number;
  nombre_tarjeta: string;
}

export interface LoginResponse extends BasicResponse {
  PK_usuario: number;
  var_nombre: string;
  var_correo: string;
  token: string;
  exp: number;
}

export interface DropdownTarjetaResponse extends BasicResponse {
  entidades: Dropdown[];
  monedas: Dropdown[];
}

export interface DropdownTransaccionResponse extends BasicResponse {
  tarjetas: Dropdown[];
  monedas: Dropdown[];
  categorias: Dropdown[];
}

export interface HistorialResponse {
  tarjeta: VisualizarTarjeta;
  transacciones: Transaccion[];
}

export interface BeneficioResponse extends BasicResponse {
  beneficio: Beneficio;
}
