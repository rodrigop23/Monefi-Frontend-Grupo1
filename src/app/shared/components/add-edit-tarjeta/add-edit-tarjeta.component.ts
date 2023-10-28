import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from '../../interfaces/Constant.interface';
import { TIPO_TARJETAS } from '../../constants/Tarjeta.constant';
import { FormValidator } from '../../util/validators/formValidator.service';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { Dropdown } from '../../interfaces/Dropdown.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { DropdownService } from 'src/app/core/services/http/dropdown/dropdown.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-add-edit-tarjeta',
  templateUrl: './add-edit-tarjeta.component.html',
  styleUrls: ['./add-edit-tarjeta.component.css'],
})
export class AddEditTarjetaComponent implements OnInit {
  @Input() tipoAccion: string = 'registrar';

  loading: boolean = false;

  tipoTarjetas: Constant[] = [];

  dataDropdownEntidades: Dropdown[] = [];
  dataDropdownMonedas: Dropdown[] = [];

  // TODO: ver si esto se puede llamar en el mismo service de tarjeta
  idUsuario: number = 0;

  tarjetaForm: FormGroup = this.fb.group({
    PK_tarjeta: [null],
    var_tipo: ['', [Validators.required]],
    var_nombre: ['', [Validators.required]],
    dte_inicio_facturacion: [null],
    dte_fin_facturacion: [null],
    dte_dia_pago: [null],
    num_lim_gasto: [null],
    FK_tarjeta_entidad: ['', [Validators.required]],
    FK_tarjeta_moneda: ['', [Validators.required]],
  });

  setValidator(field: string) {
    this.tarjetaForm.get(field)?.setValidators([Validators.required]);

    this.tarjetaForm.get(field)?.updateValueAndValidity();
  }

  clearValidator(field: string) {
    this.tarjetaForm.get(field)?.clearValidators();

    this.tarjetaForm.get(field)?.updateValueAndValidity();
  }

  seleccionarTipoTarjeta(event: string) {
    if (event === 'Crédito') {
      this.setValidator('dte_inicio_facturacion');
      this.setValidator('dte_fin_facturacion');
      this.setValidator('dte_dia_pago');

      return;
    }

    this.clearValidator('dte_inicio_facturacion');
    this.clearValidator('dte_fin_facturacion');
    this.clearValidator('dte_dia_pago');
  }

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private tarjetaService: TarjetaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dropdownService: DropdownService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
    this.tipoTarjetas = TIPO_TARJETAS;

    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerDataDropdown();

    if (!this.router.url.includes('editar')) return;

    // TODO: Verificar si ID de Tarjeta pertenece al usuario
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.tarjetaService.obtenerTarjetaPorId(id)))
      .subscribe({
        next: (tarjeta) => {
          this.seleccionarTipoTarjeta(tarjeta.var_tipo);

          this.tarjetaForm.patchValue(tarjeta);
        },
        error: () => {
          this.formValidator.handleError(
            'No se pudo obtener la tarjeta',
            '/tarjeta'
          );
        },
      });
  }

  obtenerDataDropdown() {
    this.dropdownService.obtenerDataDropdownTarjeta().subscribe({
      next: (resp) => {
        this.dataDropdownEntidades = resp.entidades;
        this.dataDropdownMonedas = resp.monedas;
      },
    });
  }

  validarCamposFormulario(field: string) {
    return this.formValidator.validarCampoFormulario(this.tarjetaForm, field);
  }

  onSubmit() {
    if (this.tarjetaForm.invalid) {
      return this.tarjetaForm.markAllAsTouched();
    }

    if (this.tipoAccion === 'editar') {
      if (!this.tarjetaForm.dirty) {
        this.snackbar.open('No se detectaron cambios', '', {
          panelClass: 'error-snackbar',
        });
        return;
      }

      this.tarjetaService.actualizarTarjeta(this.tarjetaForm.value).subscribe({
        next: () => {
          this.loading = true;

          this.formValidator.handleResponse(
            this.tarjetaForm,
            'Tarjeta actualizada exitosamente',
            '/tarjeta'
          );
        },
        error: () => {
          this.formValidator.handleError('Error al actualizar la tarjeta');
        },
      });

      return;
    }

    this.tarjetaService
      .registrarTarjeta(this.tarjetaForm.value, this.idUsuario)
      .subscribe({
        next: () => {
          this.loading = true;

          this.formValidator.handleResponse(
            this.tarjetaForm,
            'Registro de tarjeta exitoso',
            '/tarjeta'
          );
        },
        error: () => {
          this.formValidator.handleError('Error al registrar tarjeta');
        },
      });
  }
}
