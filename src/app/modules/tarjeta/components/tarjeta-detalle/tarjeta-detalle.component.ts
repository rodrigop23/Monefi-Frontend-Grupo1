import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { ObserverService } from 'src/app/core/services/observer/observer.service';
import { VisualizarTarjeta } from 'src/app/shared/interfaces/Tarjeta.interface';
import { Transaccion } from 'src/app/shared/interfaces/Transaccion.interface';

@Component({
  selector: 'app-tarjeta-detalle',
  templateUrl: './tarjeta-detalle.component.html',
  styleUrls: ['./tarjeta-detalle.component.css'],
})
export class TarjetaDetalleComponent implements OnInit {
  dataTarjeta: VisualizarTarjeta = {} as VisualizarTarjeta;
  dataTransacciones: Transaccion[] = [];

  idTarjeta: number = 0;

  constructor(
    private router: ActivatedRoute,
    private tarjetaService: TarjetaService,
    private observerService: ObserverService
  ) {
    this.idTarjeta = this.router.snapshot.paramMap.get(
      'id'
    ) as unknown as number;
  }

  ngOnInit(): void {
    this.obtenerDataTarjeta();

    this.observerService.refresh$.subscribe({
      next: () => {
        this.obtenerDataTarjeta();
      },
    });
  }

  obtenerDataTarjeta() {
    this.tarjetaService.obtenerHistorialPorIdTarjeta(this.idTarjeta).subscribe({
      next: (resp) => {
        this.dataTarjeta = resp.tarjeta;
        this.dataTransacciones = resp.transacciones;
      },
    });
  }
}
