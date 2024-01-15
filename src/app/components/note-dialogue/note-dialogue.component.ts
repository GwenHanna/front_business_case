import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-dialogue',
  templateUrl: './note-dialogue.component.html',
  styleUrls: ['./note-dialogue.component.css'],
})
export class NoteDialogueComponent implements OnInit {
  @Output() note = new EventEmitter<string>();
  @Input() dialog!: ElementRef<HTMLDialogElement>;

  sendNote() {
    this.note.emit(this.formNote.value);
  }
  formNote!: FormGroup;
  // currentBasket: DataBasketInterface | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formNote = this.fb.group({
      note: [''],
    });
  }
  //   this.currentBasket = this.config.data;

  onSubmit() {
    if (this.formNote.value) {
      this.sendNote();
    }
  }

  closeModal() {
    console.log(this.dialog);

    this.dialog.nativeElement.close();
  }

  //   this.ref.close({ note: this.formNote.value, basket: this.currentBasket });
}
