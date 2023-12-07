import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDateAccountComponent } from './up-date-account.component';

describe('UpDateAccountComponent', () => {
  let component: UpDateAccountComponent;
  let fixture: ComponentFixture<UpDateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDateAccountComponent]
    });
    fixture = TestBed.createComponent(UpDateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
