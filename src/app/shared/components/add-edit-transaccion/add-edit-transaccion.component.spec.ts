import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransaccionComponent } from './add-edit-transaccion.component';

describe('AddEditTransaccionComponent', () => {
  let component: AddEditTransaccionComponent;
  let fixture: ComponentFixture<AddEditTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTransaccionComponent]
    });
    fixture = TestBed.createComponent(AddEditTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
