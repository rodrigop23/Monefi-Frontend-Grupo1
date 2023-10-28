import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  Tarjeta,
  VisualizarTarjeta,
} from 'src/app/shared/interfaces/Tarjeta.interface';
import { environment } from 'src/environments/environment';
import {
  BasicResponse,
  HistorialResponse,
} from 'src/app/shared/interfaces/BackResponse.interface';
import { ObserverService } from '../../observer/observer.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  API_URL = environment.API_URL + '/tarjeta';

  constructor(
    private http: HttpClient,
    private observerService: ObserverService
  ) {}

  registrarTarjeta(
    datosTarjeta: Tarjeta,
    idUsuario: number
  ): Observable<BasicResponse> {
    const url = this.API_URL + `/registrar/${idUsuario}`;

    return this.http.post<BasicResponse>(url, { datosTarjeta }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  obtenerTarjetas(idUsuario: number): Observable<VisualizarTarjeta[]> {
    const url = this.API_URL + `/obtener/todo/${idUsuario}`;

    return this.http.get<VisualizarTarjeta[]>(url);
  }

  obtenerHistorialPorIdTarjeta(
    idTarjeta: number
  ): Observable<HistorialResponse> {
    const url = this.API_URL + `/historial/${idTarjeta}`;

    return this.http.get<HistorialResponse>(url);
  }

  eliminarTarjeta(idTarjeta: number): Observable<BasicResponse> {
    const url = this.API_URL + `/eliminar/${idTarjeta}`;

    return this.http
      .delete<BasicResponse>(url)
      .pipe(tap(() => this.observerService.refresh$.next()));
  }

  obtenerTarjetaPorId(idTarjeta: number): Observable<Tarjeta> {
    const url = this.API_URL + `/obtener/${idTarjeta}`;

    return this.http.get<Tarjeta>(url);
  }

  actualizarTarjeta(datosTarjeta: Tarjeta): Observable<BasicResponse> {
    const url = this.API_URL + '/actualizar';

    return this.http.put<BasicResponse>(url, { datosTarjeta }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }
}
