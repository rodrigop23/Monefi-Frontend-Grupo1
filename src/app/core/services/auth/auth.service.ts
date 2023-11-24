import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import {
  BasicResponse,
  LoginResponse,
} from 'src/app/shared/interfaces/BackResponse.interface';
import {
  LoginUsuario,
  RegistroUsuario,
  Usuario,
} from 'src/app/shared/interfaces/Usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.API_URL + '/usuario';

  private _usuario: Usuario | null = null;

  private http = inject(HttpClient);
  private router = inject(Router);

  get usuario() {
    return { ...this._usuario };
  }

  registrarUsuario(datosUsuario: RegistroUsuario): Observable<BasicResponse> {
    const url = `${this.API_URL}/registrar`;

    return this.http.post<BasicResponse>(url, { datosUsuario });
  }

  iniciarSesion(datosUsuario: LoginUsuario): Observable<LoginResponse> {
    const url = `${this.API_URL}/iniciar-sesion`;

    return this.http.post<LoginResponse>(url, datosUsuario).pipe(
      tap((res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token);

          this._usuario = {
            PK_usuario: res.PK_usuario,
            expiresIn: res.exp,
          };
        }
      })
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.API_URL}/validar-token`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<LoginResponse & boolean>(url, { headers }).pipe(
      tap((res) => {
        console.log(res);

        if (res.ok) {
          localStorage.setItem('token', res.token);

          this._usuario = {
            PK_usuario: res.PK_usuario,
            expiresIn: res.exp,
          };
        }

        return res.ok;
      }),
      catchError(() => {
        localStorage.removeItem('token');

        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.clear();
    this._usuario = null;
    this.router.navigateByUrl('/auth/login');
  }
}
