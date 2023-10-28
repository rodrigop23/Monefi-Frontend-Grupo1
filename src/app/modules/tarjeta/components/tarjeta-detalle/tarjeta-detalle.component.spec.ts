import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaDetalleComponent } from './tarjeta-detalle.component';

describe('TarjetaDetalleComponent', () => {
  let component: TarjetaDetalleComponent;
  let fixture: ComponentFixture<TarjetaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaDetalleComponent]
    });
    fixture = TestBed.createComponent(TarjetaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
