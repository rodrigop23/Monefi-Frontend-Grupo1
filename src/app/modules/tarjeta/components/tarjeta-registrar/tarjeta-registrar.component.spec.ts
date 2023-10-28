import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaRegistrarComponent } from './tarjeta-registrar.component';

describe('TarjetaRegistrarComponent', () => {
  let component: TarjetaRegistrarComponent;
  let fixture: ComponentFixture<TarjetaRegistrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaRegistrarComponent],
    });
    fixture = TestBed.createComponent(TarjetaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
