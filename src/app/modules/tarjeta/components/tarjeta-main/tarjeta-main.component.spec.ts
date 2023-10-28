import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaMainComponent } from './tarjeta-main.component';

describe('TarjetaMainComponent', () => {
  let component: TarjetaMainComponent;
  let fixture: ComponentFixture<TarjetaMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaMainComponent]
    });
    fixture = TestBed.createComponent(TarjetaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
