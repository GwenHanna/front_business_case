import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressingComponent } from './pressing.component';

describe('PressingComponent', () => {
  let component: PressingComponent;
  let fixture: ComponentFixture<PressingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressingComponent]
    });
    fixture = TestBed.createComponent(PressingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
