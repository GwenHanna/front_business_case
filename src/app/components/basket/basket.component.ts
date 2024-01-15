import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataBasketInterface } from 'src/app/entities/dataBasketInterface';
import { prestationInterface } from 'src/app/entities/prestationsInterface';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { selection } from 'src/app/models/selection';

import { BasketService } from 'src/app/services/basket.service';
import { PrestationService } from 'src/app/services/prestation.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  baskets: any;
  pricaTotal = 0;
  noteOrder: string = '';

  constructor(
    private basketService: BasketService,
    private prestationsService: PrestationService
  ) {}

  getQuantityForArticleService(articleService: serviceInterface) {
    console.log(articleService);

    return this.prestationsService.getQuantityForArticleService(articleService);
  }
  getPriceTotalForArticleService(articleService: serviceInterface) {
    console.log(articleService);

    return this.prestationsService.getPriceTotalForArticleService(
      articleService
    );
  }
  upDateQuantity(event: any, article: serviceInterface) {
    return this.prestationsService.upDateQuantity(event, article);
  }

  handleNoteEvent(data: string) {
    this.noteOrder = data;
    this.closeModal();
  }
  openModal() {
    this.dialog.nativeElement.showModal();
  }
  closeModal() {
    console.log(this.dialog);

    this.dialog.nativeElement.close();
  }

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (data) => {
        console.log('data', data);
        data.forEach((element) => {
          if (element.priceTotal) this.pricaTotal += element.priceTotal;
        });
        console.log(this.baskets);
        this.baskets = data;
        // this.baskets = data.map((basket): DataBasketInterface => {
        //   return { service: basket, isIroning: false, isDelete: true };
        // });
      },
      error: (err) => console.log('err', err),
    });
  }

  deleteBasket() {}

  submitOrder() {
    console.log(this.baskets);
    // this.baskets = this.baskets.map((basket: any) => {});
  }
}
