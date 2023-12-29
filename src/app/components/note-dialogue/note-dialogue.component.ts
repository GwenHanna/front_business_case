import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataBasketInterface } from 'src/app/entities/dataBasketInterface';

@Component({
  selector: 'app-note-dialogue',
  templateUrl: './note-dialogue.component.html',
  styleUrls: ['./note-dialogue.component.css'],
})
export class NoteDialogueComponent implements OnInit {
  formNote!: FormGroup;
  currentBasket: DataBasketInterface | undefined;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.formNote = this.fb.group({
      note: [''],
    });
    this.currentBasket = this.config.data;
  }

  onSubmit() {
    // Émettre la note et le service
    this.ref.close({ note: this.formNote.value, basket: this.currentBasket });
  }
}
