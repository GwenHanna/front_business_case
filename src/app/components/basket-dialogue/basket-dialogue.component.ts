import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-basket-dialogue',
  templateUrl: './basket-dialogue.component.html',
  styleUrls: ['./basket-dialogue.component.css'],
})
export class BasketDialogueComponent implements OnInit {
  prestationData: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.prestationData = this.config.data.prestation;
    console.log(this.prestationData);
  }
}
