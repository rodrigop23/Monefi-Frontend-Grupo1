import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alerta } from 'src/app/shared/interfaces/Alerta.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  API_URL = environment.API_URL + '/alerta';

  constructor(private http: HttpClient) {}

  obtenerAlertasPorUsuario() {
    const url = `${this.API_URL}/obtener`;

    const headers = new HttpHeaders().set(
      'jwt-token',
      localStorage.getItem('token') ?? ''
    );

    return this.http.get<Alerta[]>(url, { headers });
  }

  actualizarAlerta(idAlerta: number, bool_activo: boolean) {
    const url = `${this.API_URL}/actualizar/${idAlerta}`;

    return this.http.put(url, { bool_activo });
  }
}
