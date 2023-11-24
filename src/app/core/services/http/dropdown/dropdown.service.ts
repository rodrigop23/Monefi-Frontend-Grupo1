import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  DropdownTarjetaResponse,
  DropdownTransaccionResponse,
} from 'src/app/shared/interfaces/BackResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  API_URL = environment.API_URL + '/dropdown/registro';

  constructor(private http: HttpClient) {}

  obtenerDataDropdownTarjeta(): Observable<DropdownTarjetaResponse> {
    const url = `${this.API_URL}/tarjeta`;

    return this.http.get<DropdownTarjetaResponse>(url);
  }

  obtenerDataDropdownTransaccion(): Observable<DropdownTransaccionResponse> {
    const url = `${this.API_URL}/transaccion`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<DropdownTransaccionResponse>(url, { headers });
  }
}
