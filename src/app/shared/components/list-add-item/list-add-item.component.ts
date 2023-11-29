import { Component, Input } from '@angular/core';
import { Transaccion } from '../../interfaces/Transaccion.interface';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-list-add-item',
  templateUrl: './list-add-item.component.html',
  styleUrls: ['./list-add-item.component.css'],
})
export class ListAddItemComponent {
  @Input() transaccion: Transaccion = {} as Transaccion;

  constructor(
    private transaccionService: TransaccionService,
    private router: Router
  ) {}

  agregarTransaccionRecurrente() {
    this.transaccionService
      .registrarTransaccionRecurrente(this.transaccion.PK_transaccion)
      .subscribe({
        next: (res) => {
          this.router.navigate([`/transaccion/editar/${res.toString()}`]);
        },
      });
  }
}
