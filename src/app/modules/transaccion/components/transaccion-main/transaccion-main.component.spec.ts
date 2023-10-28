import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionMainComponent } from './transaccion-main.component';

describe('TransaccionMainComponent', () => {
  let component: TransaccionMainComponent;
  let fixture: ComponentFixture<TransaccionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionMainComponent]
    });
    fixture = TestBed.createComponent(TransaccionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
