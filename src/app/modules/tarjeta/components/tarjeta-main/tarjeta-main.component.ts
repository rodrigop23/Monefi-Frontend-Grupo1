import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { ObserverService } from 'src/app/core/services/observer/observer.service';
import { VisualizarTarjeta } from 'src/app/shared/interfaces/Tarjeta.interface';

@Component({
  selector: 'app-tarjeta-main',
  templateUrl: './tarjeta-main.component.html',
  styleUrls: ['./tarjeta-main.component.css'],
})
export class TarjetaMainComponent implements OnInit, OnDestroy {
  idUsuario: number = 0;

  dataTarjetas: VisualizarTarjeta[] = [];

  suscripcion: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private tarjetaService: TarjetaService,
    private observerService: ObserverService
  ) {
    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerTarjetasPorUsuario();

    this.suscripcion = this.observerService.refresh$.subscribe({
      next: () => {
        this.obtenerTarjetasPorUsuario();
      },
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  obtenerTarjetasPorUsuario() {
    this.tarjetaService.obtenerTarjetas(this.idUsuario).subscribe({
      next: (resp) => {
        this.dataTarjetas = resp;
      },
    });
  }
}
