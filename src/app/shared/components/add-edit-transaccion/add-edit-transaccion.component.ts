import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../util/validators/formValidator.service';
import { TIPO_TRANSACCION } from '../../constants/Transaccion.constant';
import { Constant } from '../../interfaces/Constant.interface';
import { Dropdown } from '../../interfaces/Dropdown.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from 'src/app/core/services/http/dropdown/dropdown.service';
import { TransaccionService } from 'src/app/core/services/http/transaccion/transaccion.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from '../custom-snackbar/service/custom-snackbar.service';
import { TransaccionResponse } from '../../interfaces/BackResponse.interface';

@Component({
  selector: 'app-add-edit-transaccion',
  templateUrl: './add-edit-transaccion.component.html',
  styleUrls: ['./add-edit-transaccion.component.css'],
})
export class AddEditTransaccionComponent implements OnInit {
  @Input() tipoAccion: string = 'registrar';

  loading: boolean = false;

  tipoTransacciones: Constant[] = [];

  dataDropdownTarjetas: Dropdown[] = [];
  dataDropdownMonedas: Dropdown[] = [];
  dataDropdownCategorias: Dropdown[] = [];

  transaccionForm: FormGroup = this.fb.group({
    PK_transaccion: [null],
    var_tipo: ['', [Validators.required]],
    num_monto: ['', [Validators.required]],
    var_nombre: ['', [Validators.required]],
    dte_fecha: ['', [Validators.required]],
    FK_transaccion_categoria: ['', [Validators.required]],
    FK_transaccion_moneda: ['', [Validators.required]],
    FK_transaccion_tarjeta: ['', [Validators.required]],
    bool_recurrente: [false],
  });

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dropdownService: DropdownService,
    private transaccionService: TransaccionService,
    private _snackbarService: CustomSnackbarService
  ) {
    this.tipoTransacciones = TIPO_TRANSACCION;
  }

  ngOnInit(): void {
    this.obtenerDataDropdown();

    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.transaccionService.obtenerTransaccion(id))
      )
      .subscribe({
        next: (transaccion) => {
          this.transaccionForm.patchValue(transaccion);
        },
        error: () => {
          this.formValidator.handleError(
            'No se pudo obtener la transacción',
            '/transaccion'
          );
        },
      });
  }

  obtenerDataDropdown() {
    this.dropdownService.obtenerDataDropdownTransaccion().subscribe({
      next: (resp) => {
        this.dataDropdownTarjetas = resp.tarjetas;
        this.dataDropdownMonedas = resp.monedas;
        this.dataDropdownCategorias = resp.categorias;
      },
    });
  }

  validarCamposFormulario(field: string) {
    return this.formValidator.validarCampoFormulario(
      this.transaccionForm,
      field
    );
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  // todo: hacer que funcione esto
  manejarAlertas(res: TransaccionResponse) {
    if (res.superoLimite) {
      this.abrirSnackbar(
        'notification',
        `Se ha excedido del limite de linea de la tarjeta ${
          res.nombre_tarjeta
        } en ${res.monto.toLocaleString('es-PE', {
          style: 'currency',
          currency: 'PEN',
        })}`,
        'notification'
      );

      this.router.navigate(['/transaccion']);
      return;
    }

    if (res.cercaLimite) {
      this.abrirSnackbar(
        'notification',
        `La tarjeta ${
          res.nombre_tarjeta
        } esta cerca de su limite de linea en ${res.monto.toLocaleString(
          'es-PE',
          {
            style: 'currency',
            currency: 'PEN',
          }
        )}`,
        'notification'
      );

      this.router.navigate(['/transaccion']);
      return;
    }
  }

  onSubmit() {
    if (this.transaccionForm.invalid) {
      return this.transaccionForm.markAllAsTouched();
    }

    if (this.tipoAccion === 'editar') {
      if (!this.transaccionForm.dirty) {
        return this.abrirSnackbar(
          'warning',
          'No se detectaron cambios',
          'warning'
        );
      }
      this.transaccionService
        .actualizarTransaccion(this.transaccionForm.value)
        .subscribe({
          next: (res) => {
            if (res.superoLimite) {
              this.abrirSnackbar(
                'notification',
                `Se ha excedido del limite de linea de la tarjeta ${
                  res.nombre_tarjeta
                } en ${res.monto.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                })}`,
                'notification'
              );

              this.router.navigate(['/transaccion']);
              return;
            }

            if (res.cercaLimite) {
              this.abrirSnackbar(
                'notification',
                `La tarjeta ${
                  res.nombre_tarjeta
                } esta cerca de su limite de linea en ${res.monto.toLocaleString(
                  'es-PE',
                  {
                    style: 'currency',
                    currency: 'PEN',
                  }
                )}`,
                'notification'
              );

              this.router.navigate(['/transaccion']);
              return;
            }

            this.loading = true;

            this.formValidator.handleResponse(
              this.transaccionForm,
              'Transacción actualizada exitosamente',
              '/transaccion'
            );
          },
          error: () => {
            this.formValidator.handleError('Error al actualizar transacción');
          },
        });
      return;
    }

    this.transaccionService
      .registrarTransaccion(this.transaccionForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.superoLimite) {
            this.abrirSnackbar(
              'notification',
              `Se ha excedido del limite de linea de la tarjeta ${
                res.nombre_tarjeta
              } en ${res.monto.toLocaleString('es-PE', {
                style: 'currency',
                currency: 'PEN',
              })}`,
              'notification'
            );

            this.router.navigate(['/transaccion']);
            return;
          }

          if (res.cercaLimite) {
            this.abrirSnackbar(
              'notification',
              `La tarjeta ${
                res.nombre_tarjeta
              } esta cerca de su limite de linea en ${res.monto.toLocaleString(
                'es-PE',
                {
                  style: 'currency',
                  currency: 'PEN',
                }
              )}`,
              'notification'
            );

            this.router.navigate(['/transaccion']);
            return;
          }

          this.loading = true;

          this.formValidator.handleResponse(
            this.transaccionForm,
            'Registro de transacción exitoso',
            '/transaccion'
          );
        },
        error: (err) => {
          console.log(err);
          this.formValidator.handleError('Error al registrar transacción');
        },
      });
  }
}
