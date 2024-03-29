import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  BasicResponse,
  TransaccionResponse,
} from 'src/app/shared/interfaces/BackResponse.interface';
import {
  Transaccion,
  TransaccionCompleta,
} from 'src/app/shared/interfaces/Transaccion.interface';
import { environment } from 'src/environments/environment';
import { ObserverService } from '../../observer/observer.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  API_URL = environment.API_URL + '/transaccion';

  constructor(
    private http: HttpClient,
    private observerService: ObserverService
  ) {}

  obtenerHistorialTransacciones(idUsuario: number): Observable<Transaccion[]> {
    const url = `${this.API_URL}/historial/${idUsuario}`;

    return this.http.get<Transaccion[]>(url);
  }

  registrarTransaccion(
    datosTransaccion: TransaccionCompleta
  ): Observable<TransaccionResponse> {
    const url = `${this.API_URL}/registrar`;

    return this.http.post<TransaccionResponse>(url, { datosTransaccion }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  obtenerTransaccion(idTransaccion: number): Observable<TransaccionCompleta> {
    const url = `${this.API_URL}/${idTransaccion}`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<TransaccionCompleta>(url, { headers });
  }

  actualizarTransaccion(
    dataTransaccion: TransaccionCompleta
  ): Observable<TransaccionResponse> {
    const url = `${this.API_URL}/actualizar`;

    return this.http.put<TransaccionResponse>(url, { dataTransaccion }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  eliminarTransaccion(idTransaccion: number): Observable<BasicResponse> {
    const url = `${this.API_URL}/eliminar/${idTransaccion}`;

    return this.http
      .delete<BasicResponse>(url)
      .pipe(tap(() => this.observerService.refresh$.next()));
  }

  obtenerTransaccionesRecurrentes() {
    const url = `${this.API_URL}/tipo/recurrente`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<Transaccion[]>(url, { headers });
  }

  registrarTransaccionRecurrente(idTransaccion: number) {
    const url = `${this.API_URL}/registrar/recurrente`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http
      .post<number>(url, { idTransaccion }, { headers })
      .pipe(tap(() => this.observerService.refresh$.next()));
  }

  obtenerTransaccionesAutomaticas() {
    const url = `${this.API_URL}/tipo/automatica`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<Transaccion[]>(url, { headers });
  }

  cancelarTransaccionAutomatica(idTransaccion: number) {
    const url = `${this.API_URL}/cancelar/${idTransaccion}`;

    return this.http
      .delete<BasicResponse>(url)
      .pipe(tap(() => this.observerService.refresh$.next()));
  }
}
