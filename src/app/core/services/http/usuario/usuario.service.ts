import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BasicResponse } from 'src/app/shared/interfaces/BackResponse.interface';
import { IUsuario } from 'src/app/shared/interfaces/Usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API_URL = environment.API_URL + '/usuario';

  constructor(private http: HttpClient) {}

  obtenerDatosPerfil(): Observable<IUsuario> {
    const url = `${this.API_URL}/perfil`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<IUsuario>(url, { headers });
  }

  actualizarPerfil(datosNuevos: any) {
    const url = `${this.API_URL}/actualizar/perfil`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.put(url, { datosNuevos }, { headers });
  }

  actualizarContrasena(datosNuevos: any) {
    const url = `${this.API_URL}/actualizar/contrasena`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.put(url, { datosNuevos }, { headers });
  }

  eliminarCuenta() {
    const url = `${this.API_URL}/eliminar`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.delete<BasicResponse>(url, { headers });
  }

  deshabilitarCuenta() {
    const url = `${this.API_URL}/deshabilitar`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.put<BasicResponse>(url, {}, { headers });
  }
}
