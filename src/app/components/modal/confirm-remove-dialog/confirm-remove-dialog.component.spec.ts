import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemoveDialogComponent } from './confirm-remove-dialog.component';

describe('ConfirmRemoveDialogComponent', () => {
  let component: ConfirmRemoveDialogComponent;
  let fixture: ComponentFixture<ConfirmRemoveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRemoveDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
