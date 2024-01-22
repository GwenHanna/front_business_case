import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  // @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  baskets: any;
  pricaTotal = 0;
  noteOrder: string = '';
  test: any;
  private isIroningSubject = new BehaviorSubject<boolean>(false);
  isIroning$: Observable<boolean> = this.isIroningSubject.asObservable();

  constructor(
    private basketService: BasketService,
    private prestationsService: PrestationService
  ) {}

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (data) => {
        console.log('data', data);
        data.forEach((element) => {
          if (element.priceTotal) this.pricaTotal += element.priceTotal;
        });
        this.baskets = data;

        this.test = data.map((item): any => {
          return { service: item, isIroning: false, isDelete: false };
        });
      },
      error: (err) => console.log('err', err),
    });
  }

  getQuantityForArticleService(articleService: serviceInterface) {
    return this.prestationsService.getQuantityForArticleService(articleService);
  }

  setIsIroning(service: any, value: boolean) {
    console.log(service);
    service.isIroning = !service.isIronnig;
    this.isIroningSubject.next(value);
    console.log(value);
  }
  getPriceTotalForArticleService(
    articleService: serviceInterface,
    isIroning: boolean
  ) {
    console.log(articleService);
    const quantity = this.getQuantityForArticleService(articleService);
    let priceTotal =
      this.prestationsService.getPriceTotalForArticleService(articleService);
    if (isIroning && priceTotal) {
      priceTotal += quantity * 5;
    }

    return priceTotal;
  }

  updatePriceTotal() {}

  upDateQuantity(event: any, article: serviceInterface) {
    return this.prestationsService.upDateQuantity(event, article);
  }

  handleNoteEvent(data: string) {
    this.noteOrder = data;
    console.log(this.noteOrder);
  }
  // openModal() {
  //   this.dialog.nativeElement.showModal();
  // }
  // closeModal() {
  //   console.log(this.dialog);

  //   this.dialog.nativeElement.close();
  // }

  deleteBasket() {}

  submitOrder() {
    console.log(this.baskets);
    // this.baskets = this.baskets.map((basket: any) => {});
  }
}
