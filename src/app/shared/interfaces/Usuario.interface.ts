export interface RegistroUsuario {
  var_nombres: string;
  var_apellidos: string;
  var_correo: string;
  var_contrasena: string;
}

export interface LoginUsuario {
  var_correo: string;
  var_contrasena: string;
}

export interface Usuario {
  PK_usuario: number;
  expiresIn: number;
}

export interface IUsuario {
  PK_usuario: number;
  var_nombres: string;
  var_apellidos: string;
  var_correo: string;
  bool_activo: boolean;
  var_nombre_completo?: string;
}
