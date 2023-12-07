import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { selection } from 'src/app/models/selection';

@Component({
  selector: 'app-basket-dialogue',
  templateUrl: './basket-dialogue.component.html',
  styleUrls: ['./basket-dialogue.component.css'],
})
export class BasketDialogueComponent implements OnInit {
  prestationData: selection[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.prestationData = this.config.data.prestation;
  }
}
