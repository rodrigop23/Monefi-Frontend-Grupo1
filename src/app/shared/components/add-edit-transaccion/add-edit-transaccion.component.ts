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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-transaccion',
  templateUrl: './add-edit-transaccion.component.html',
  styleUrls: ['./add-edit-transaccion.component.css'],
})
export class AddEditTransaccionComponent implements OnInit {
  @Input() tipoAccion: string = 'registrar';

  loading: boolean = false;
  idUsuario: number = 0;

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
  });

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dropdownService: DropdownService,
    private transaccionService: TransaccionService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {
    this.tipoTransacciones = TIPO_TRANSACCION;

    this.idUsuario = this.authService.usuario.PK_usuario!;
  }

  ngOnInit(): void {
    this.obtenerDataDropdown();

    if (!this.router.url.includes('editar')) return;

    // TODO: Verificar si ID de Tarjeta pertenece al usuario
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
    this.dropdownService
      .obtenerDataDropdownTransaccion(this.idUsuario)
      .subscribe({
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

  onSubmit() {
    if (this.transaccionForm.invalid) {
      return this.transaccionForm.markAllAsTouched();
    }

    if (this.tipoAccion === 'editar') {
      if (!this.transaccionForm.dirty) {
        this.snackbar.open('No se detectaron cambios', '', {
          panelClass: 'error-snackbar',
        });
        return;
      }

      this.transaccionService
        .actualizarTransaccion(this.transaccionForm.value)
        .subscribe({
          next: () => {
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
        next: () => {
          this.loading = true;

          this.formValidator.handleResponse(
            this.transaccionForm,
            'Registro de transacción exitoso',
            '/transaccion'
          );
        },
        error: () => {
          this.formValidator.handleError('Error al registrar transacción');
        },
      });
  }
}
