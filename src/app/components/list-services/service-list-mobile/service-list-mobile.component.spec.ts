import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListMobileComponent } from './service-list-mobile.component';

describe('ServiceListMobileComponent', () => {
  let component: ServiceListMobileComponent;
  let fixture: ComponentFixture<ServiceListMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceListMobileComponent]
    });
    fixture = TestBed.createComponent(ServiceListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
