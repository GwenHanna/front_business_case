import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDialogueComponent } from './note-dialogue.component';

describe('NoteDialogueComponent', () => {
  let component: NoteDialogueComponent;
  let fixture: ComponentFixture<NoteDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteDialogueComponent]
    });
    fixture = TestBed.createComponent(NoteDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
