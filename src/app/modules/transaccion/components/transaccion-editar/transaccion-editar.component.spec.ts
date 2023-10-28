import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionEditarComponent } from './transaccion-editar.component';

describe('TransaccionEditarComponent', () => {
  let component: TransaccionEditarComponent;
  let fixture: ComponentFixture<TransaccionEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionEditarComponent],
    });
    fixture = TestBed.createComponent(TransaccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
