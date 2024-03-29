import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import { ObserverService } from 'src/app/core/services/observer/observer.service';
import { Transaccion } from 'src/app/shared/interfaces/Transaccion.interface';

@Component({
  selector: 'app-transaccion-main',
  templateUrl: './transaccion-main.component.html',
  styleUrls: ['./transaccion-main.component.css'],
})
export class TransaccionMainComponent implements OnInit, OnDestroy {
  idUsuario: number = 0;

  dataTransacciones: Transaccion[] = [];

  dataRecurrentes: Transaccion[] = [];

  dataAutomaticas: Transaccion[] = [];

  suscripcion: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private transaccionService: TransaccionService,
    private observerService: ObserverService
  ) {
    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerHistorialTransacciones();

    this.obtenerTransaccionesRecurrentes();

    this.obtenerTransaccionesAutomaticas();

    this.suscripcion = this.observerService.refresh$.subscribe({
      next: () => {
        this.obtenerHistorialTransacciones();

        this.obtenerTransaccionesRecurrentes();

        this.obtenerTransaccionesAutomaticas();
      },
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  obtenerHistorialTransacciones() {
    this.transaccionService
      .obtenerHistorialTransacciones(this.idUsuario)
      .subscribe({
        next: (resp) => {
          this.dataTransacciones = resp;
        },
      });
  }

  obtenerTransaccionesRecurrentes() {
    this.transaccionService.obtenerTransaccionesRecurrentes().subscribe({
      next: (resp) => {
        console.log(resp);
        this.dataRecurrentes = resp;
      },
    });
  }

  obtenerTransaccionesAutomaticas() {
    this.transaccionService.obtenerTransaccionesAutomaticas().subscribe({
      next: (resp) => {
        console.log(resp);
        this.dataAutomaticas = resp;
      },
    });
  }
}
