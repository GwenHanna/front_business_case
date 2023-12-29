import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NoteDialogueComponent } from '../components/note-dialogue/note-dialogue.component';

@Injectable({
  providedIn: 'root',
})
export class ModaleService {
  constructor(private dialoguService: DialogService) {}

  openModalNote(data: any): DynamicDialogRef {
    return this.dialoguService.open(NoteDialogueComponent, {
      header: 'Note',
      width: '25%',
      height: '50vh',
      position: 'center',
      appendTo: 'body',
      data: data,
    });
  }
}
