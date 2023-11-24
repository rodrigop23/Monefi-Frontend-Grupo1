import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { ExcelTarjetaData } from 'src/app/shared/interfaces/Excel.interface';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  API_URL = environment.API_URL + '/tarjeta';

  constructor(
    private http: HttpClient,
    private observerService: ObserverService
  ) {}

  registrarTarjeta(datosTarjeta: Tarjeta): Observable<BasicResponse> {
    const url = this.API_URL + '/registrar/';

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .post<BasicResponse>(url, { datosTarjeta }, { headers })
      .pipe(
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

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<Tarjeta>(url, { headers });
  }

  actualizarTarjeta(datosTarjeta: Tarjeta): Observable<BasicResponse> {
    const url = this.API_URL + '/actualizar';

    return this.http.put<BasicResponse>(url, { datosTarjeta }).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  excelHistorialPorTarjeta(idTarjeta: number) {
    const url = this.API_URL + `/excel/${idTarjeta}`;

    return this.http.get<ExcelTarjetaData[]>(url);
  }

  excelHistorialPorUsuario() {
    const url = this.API_URL + `/excel-general`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get(url, { headers });
  }
}
