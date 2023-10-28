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
  var_correo: string;
  var_nombre: string;
  expiresIn: number;
}
