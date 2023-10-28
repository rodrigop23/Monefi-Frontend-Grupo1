import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionRegistrarComponent } from './transaccion-registrar.component';

describe('TransaccionRegistrarComponent', () => {
  let component: TransaccionRegistrarComponent;
  let fixture: ComponentFixture<TransaccionRegistrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionRegistrarComponent],
    });
    fixture = TestBed.createComponent(TransaccionRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
