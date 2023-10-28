import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioRegistrarComponent } from './beneficio-registrar.component';

describe('BeneficioRegistrarComponent', () => {
  let component: BeneficioRegistrarComponent;
  let fixture: ComponentFixture<BeneficioRegistrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficioRegistrarComponent]
    });
    fixture = TestBed.createComponent(BeneficioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
