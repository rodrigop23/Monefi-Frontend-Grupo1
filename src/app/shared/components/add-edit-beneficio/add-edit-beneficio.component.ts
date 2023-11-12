import { Component, Input, OnInit } from '@angular/core';
import { Constant } from '../../interfaces/Constant.interface';
import { TIPO_TARJETAS } from '../../constants/Tarjeta.constant';
import { Dropdown } from '../../interfaces/Dropdown.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from 'src/app/core/services/http/dropdown/dropdown.service';
import { TarjetaService } from 'src/app/core/services/http/tarjeta/tarjeta.service';
import { BeneficioService } from 'src/app/core/services/http/beneficio/beneficio.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { FormValidator } from '../../util/validators/formValidator.service';
import {
  CustomSnackbarService,
  TipoSnackbar,
} from '../custom-snackbar/service/custom-snackbar.service';

@Component({
  selector: 'app-add-edit-beneficio',
  templateUrl: './add-edit-beneficio.component.html',
  styleUrls: ['./add-edit-beneficio.component.css'],
})
export class AddEditBeneficioComponent implements OnInit {
  @Input() tipoAccion: string = 'registrar';

  tipoTarjetas: Constant[] = [];

  dataDropdownEntidades: Dropdown[] = [];

  loading: boolean = false;

  beneficioForm: FormGroup = this.fb.group({
    PK_beneficio: [null],
    PK_tarjeta: [null],
    var_tipo: [{ value: '', disabled: true }, [Validators.required]],
    FK_tarjeta_entidad: [{ value: '', disabled: true }, [Validators.required]],
    var_nombre: ['', [Validators.required]],
    num_valor: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dropdownService: DropdownService,
    private tarjetaService: TarjetaService,
    private beneficioService: BeneficioService,
    private router: Router,
    private formValidator: FormValidator,
    private _snackbarService: CustomSnackbarService
  ) {
    this.tipoTarjetas = TIPO_TARJETAS;
  }

  ngOnInit(): void {
    this.obtenerDataDropdownEntidad();

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tarjetaService.obtenerTarjetaPorId(id)),
        switchMap((tarjeta) => {
          tarjeta.var_nombre = '';

          this.beneficioForm.patchValue(tarjeta);

          if (!this.router.url.includes('editar')) {
            return [];
          }

          return this.beneficioService.obtenerBeneficio(tarjeta.PK_tarjeta);
        })
      )
      .subscribe({
        next: (resp) => {
          this.beneficioForm.patchValue(resp.beneficio);
        },
      });
  }

  obtenerDataDropdownEntidad(): void {
    this.dropdownService.obtenerDataDropdownTarjeta().subscribe({
      next: (resp) => {
        this.dataDropdownEntidades = resp.entidades;
      },
    });
  }

  // todo: falta el idTarjeta
  obtenerDataTarjeta(): void {
    this.tarjetaService.obtenerTarjetaPorId(11).subscribe({
      next: (tarjeta) => {
        tarjeta.var_nombre = '';

        this.beneficioForm.reset(tarjeta);
      },
    });
  }

  validarCamposFormulario(field: string) {
    return this.formValidator.validarCampoFormulario(this.beneficioForm, field);
  }

  abrirSnackbar(icono: string, mensaje: string, tipo: TipoSnackbar) {
    this._snackbarService.loadSnackBar(icono, mensaje, tipo);
  }

  onSubmit() {
    if (this.beneficioForm.invalid) {
      return this.beneficioForm.markAllAsTouched();
    }

    if (this.tipoAccion === 'editar') {
      if (!this.beneficioForm.dirty) {
        return this.abrirSnackbar(
          'warning',
          'No se detectaron cambios',
          'warning'
        );
      }

      this.beneficioService
        .actualizarBeneficio(this.beneficioForm.value)
        .subscribe({
          next: () => {
            this.loading = true;

            this.formValidator.handleResponse(
              this.beneficioForm,
              'Beneficio actualizando exitosamente',
              '/tarjeta'
            );
          },
          error: () => {
            this.formValidator.handleError('Error al actualizar beneficio');
          },
        });

      return;
    }

    this.beneficioService
      .registrarBeneficio(this.beneficioForm.value)
      .subscribe({
        next: () => {
          this.loading = true;

          this.formValidator.handleResponse(
            this.beneficioForm,
            'Beneficio registrado exitosamente',
            '/tarjeta'
          );
        },
        error: () => {
          this.formValidator.handleError('Error al registrar beneficio');
        },
      });
  }
}
