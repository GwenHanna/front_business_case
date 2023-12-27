import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-dialogue',
  templateUrl: './basket-dialogue.component.html',
  styleUrls: ['./basket-dialogue.component.css'],
})
export class BasketDialogueComponent implements OnInit {
  prestationData: selectionInterface[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.basketService.getPrestation().subscribe({
      next: (data) => (this.prestationData = data),
      error: (err) => console.log('err', err),
    });
    console.log('this.prestationData', this.prestationData);
  }

  emptyBasket() {
    console.log('prestationData', this.prestationData);
    this.basketService.deleteBasket();
  }

  submitBasket() {}
}
