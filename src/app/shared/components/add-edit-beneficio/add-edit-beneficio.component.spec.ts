import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBeneficioComponent } from './add-edit-beneficio.component';

describe('AddEditBeneficioComponent', () => {
  let component: AddEditBeneficioComponent;
  let fixture: ComponentFixture<AddEditBeneficioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBeneficioComponent]
    });
    fixture = TestBed.createComponent(AddEditBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
