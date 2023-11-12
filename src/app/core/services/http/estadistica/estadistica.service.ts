import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadisticaResponse } from 'src/app/shared/interfaces/Estadistica.interface';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  API_URL = environment.API_URL + '/transaccion';

  constructor(private http: HttpClient) {}

  obtenerEstadisticasMensuales(idUsuario: number, mesActual: number): Observable<EstadisticaResponse> {
    const url = `${this.API_URL}/general/${idUsuario}`;

    return this.http.get<EstadisticaResponse>(url, { params: { mesActual } });
  }
}
