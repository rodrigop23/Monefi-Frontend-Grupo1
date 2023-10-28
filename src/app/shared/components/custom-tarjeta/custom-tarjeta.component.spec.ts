import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTarjetaComponent } from './custom-tarjeta.component';

describe('CustomTarjetaComponent', () => {
  let component: CustomTarjetaComponent;
  let fixture: ComponentFixture<CustomTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTarjetaComponent]
    });
    fixture = TestBed.createComponent(CustomTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
