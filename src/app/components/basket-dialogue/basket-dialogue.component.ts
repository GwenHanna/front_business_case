import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { selection } from 'src/app/models/selection';

@Component({
  selector: 'app-basket-dialogue',
  templateUrl: './basket-dialogue.component.html',
  styleUrls: ['./basket-dialogue.component.css'],
})
export class BasketDialogueComponent implements OnInit {
  prestationData: selectionInterface[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.prestationData = this.config.data.prestation;
    console.log('this.prestationData', this.prestationData);
  }
}
