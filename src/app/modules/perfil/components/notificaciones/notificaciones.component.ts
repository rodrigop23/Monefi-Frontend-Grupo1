import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/core/services/http/alerta/alerta.service';
import { Alerta } from 'src/app/shared/interfaces/Alerta.interface';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit {
  dataAlerta: Alerta[] = [];

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.obtenerAlertaPorUsuario();
  }

  obtenerAlertaPorUsuario() {
    this.alertaService.obtenerAlertasPorUsuario().subscribe({
      next: (res) => {
        this.dataAlerta = res;
      },
    });
  }

  actualizarAlerta(alerta: Alerta) {
    if (alerta.bool_activo) {
      this.alertaService
        .actualizarAlerta(alerta.PK_alerta, !alerta.bool_activo)
        .subscribe({
          next: () => {
            this.obtenerAlertaPorUsuario();
          },
        });
    }
  }
}
