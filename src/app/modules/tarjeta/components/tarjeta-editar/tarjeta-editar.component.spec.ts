import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEditarComponent } from './tarjeta-editar.component';

describe('TarjetaEditarComponent', () => {
  let component: TarjetaEditarComponent;
  let fixture: ComponentFixture<TarjetaEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaEditarComponent],
    });
    fixture = TestBed.createComponent(TarjetaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
