import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  BasicResponse,
  BeneficioResponse,
  HistorialResponse,
} from 'src/app/shared/interfaces/BackResponse.interface';
import { Beneficio } from 'src/app/shared/interfaces/Beneficio.interface';
import { environment } from 'src/environments/environment';
import { ObserverService } from '../../observer/observer.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class BeneficioService {
  API_URL = environment.API_URL + '/beneficio';

  constructor(
    private http: HttpClient,
    private observerService: ObserverService
  ) {}

  obtenerBeneficio(idTarjeta: number): Observable<BeneficioResponse> {
    const url = `${this.API_URL}/obtener/${idTarjeta}`;

    return this.http.get<BeneficioResponse>(url);
  }

  registrarBeneficio(datosBeneficio: Beneficio): Observable<BasicResponse> {
    const url = `${this.API_URL}/registrar`;

    return this.http.post<BasicResponse>(url, { datosBeneficio });
  }

  actualizarBeneficio(datosBeneficio: Beneficio): Observable<BasicResponse> {
    const url = `${this.API_URL}/actualizar`;

    return this.http.put<BasicResponse>(url, { datosBeneficio });
  }

  eliminarBeneficio(idBeneficio: number): Observable<BasicResponse> {
    const url = `${this.API_URL}/eliminar/${idBeneficio}`;

    return this.http
      .delete<BasicResponse>(url)
      .pipe(tap(() => this.observerService.refresh$.next()));
  }

  obtenerBeneficiosPorTransaccion(idTarjeta: number) {
    const url = `${this.API_URL}/obtenerPorTransaccion/${idTarjeta}`;

    return this.http.get<HistorialResponse>(url);
  }
}
