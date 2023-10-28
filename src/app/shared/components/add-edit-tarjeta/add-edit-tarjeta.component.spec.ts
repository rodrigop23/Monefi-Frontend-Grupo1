import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTarjetaComponent } from './add-edit-tarjeta.component';

describe('AddEditTarjetaComponent', () => {
  let component: AddEditTarjetaComponent;
  let fixture: ComponentFixture<AddEditTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTarjetaComponent]
    });
    fixture = TestBed.createComponent(AddEditTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
