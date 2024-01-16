import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMobileComponent } from './nav-bar-mobile.component';

describe('NavBarMobileComponent', () => {
  let component: NavBarMobileComponent;
  let fixture: ComponentFixture<NavBarMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarMobileComponent]
    });
    fixture = TestBed.createComponent(NavBarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
