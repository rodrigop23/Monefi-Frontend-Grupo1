import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ExceljsService } from 'src/app/core/services/exceljs/exceljs.service';
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
    private observerService: ObserverService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private excelService: ExceljsService
  ) {
    this.idUsuario = this.authService.usuario.PK_usuario!;

    this.matIconRegistry.addSvgIcon(
      'icon_excel',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/excel_icon.svg'
      )
    );
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

  descargarExcelTransacciones() {
    this.tarjetaService.excelHistorialPorUsuario().subscribe({
      next: (resp) => {
        console.log(resp);
        this.excelService.excelGeneralTarjetas(resp);
      },
    });
  }
}
