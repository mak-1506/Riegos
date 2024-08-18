import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersaddPage } from './customersadd.page';

describe('CustomersaddPage', () => {
  let component: CustomersaddPage;
  let fixture: ComponentFixture<CustomersaddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
