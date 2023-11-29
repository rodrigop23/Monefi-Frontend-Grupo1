import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeleteItemComponent } from './list-delete-item.component';

describe('ListDeleteItemComponent', () => {
  let component: ListDeleteItemComponent;
  let fixture: ComponentFixture<ListDeleteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDeleteItemComponent]
    });
    fixture = TestBed.createComponent(ListDeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
