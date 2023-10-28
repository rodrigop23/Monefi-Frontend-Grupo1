import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BasicResponse } from 'src/app/shared/interfaces/BackResponse.interface';
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
  ): Observable<BasicResponse> {
    const url = `${this.API_URL}/registrar`;

    return this.http.post<BasicResponse>(url, { datosTransaccion }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  obtenerTransaccion(idTransaccion: number): Observable<TransaccionCompleta> {
    const url = `${this.API_URL}/${idTransaccion}`;

    return this.http.get<TransaccionCompleta>(url);
  }

  actualizarTransaccion(
    dataTransaccion: TransaccionCompleta
  ): Observable<BasicResponse> {
    const url = `${this.API_URL}/actualizar`;

    return this.http.put<BasicResponse>(url, { dataTransaccion }).pipe(
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
}
