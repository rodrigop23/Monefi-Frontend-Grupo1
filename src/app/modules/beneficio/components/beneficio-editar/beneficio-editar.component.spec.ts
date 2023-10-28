import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioEditarComponent } from './beneficio-editar.component';

describe('BeneficioEditarComponent', () => {
  let component: BeneficioEditarComponent;
  let fixture: ComponentFixture<BeneficioEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficioEditarComponent]
    });
    fixture = TestBed.createComponent(BeneficioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
