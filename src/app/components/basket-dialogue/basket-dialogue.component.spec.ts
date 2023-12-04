import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogueComponent } from './basket-dialogue.component';

describe('BasketDialogueComponent', () => {
  let component: BasketDialogueComponent;
  let fixture: ComponentFixture<BasketDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketDialogueComponent]
    });
    fixture = TestBed.createComponent(BasketDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
