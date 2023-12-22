import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BasketDialogueComponent } from '../components/basket-dialogue/basket-dialogue.component';
import { PrestationService } from './prestation.service';
import { selection } from '../models/selection';
import { BehaviorSubject } from 'rxjs';
import { selectionInterface } from '../entities/selectionInterface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basket: selectionInterface[] = [];
  private storeBasket: any = localStorage.getItem('basket');
  private subjectBasket = new BehaviorSubject<selectionInterface[]>([]);

  constructor(
    private dialoguService: DialogService,
    private prestationService: PrestationService
  ) {
    this.basket = JSON.parse(this.storeBasket) || [];
    this.updateBasket();
  }
  updateBasket() {
    this.subjectBasket.next(this.basket);
  }
  addPrestationInLocalStorage(prestation: selectionInterface) {
    let existElem: selectionInterface | undefined = this.basket.find(
      (item) => item.service.id === prestation.service.id
    );

    if (existElem) {
      existElem.quantity = prestation.quantity;
    } else {
      this.basket.push(prestation);
    }

    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.updateBasket();
  }

  getPrestation() {
    return this.subjectBasket.asObservable();
  }

  openModal(prestationData: any) {
    const ref = this.dialoguService.open(BasketDialogueComponent, {
      header: 'Mon panier',
      width: '25%',
      height: '90vh',
      position: 'right',
      data: { prestation: prestationData },
      appendTo: 'body',
    });
    ref.onClose.subscribe({
      next: (result) => {
        console.log('Modal fermé');
      },
    });
  }

  // getBasket() {
  //   this.getPrestation().subscribe({
  //     next: (basket) => {
  //       console.log(basket);
  //       basket.forEach((element) => {
  //         if (!this.basket) {
  //           this.basketFilter = [];
  //         }
  //         const exitElem = this.basket.findIndex(
  //           (item) => item.serviceName === element.serviceName
  //         );

  //         if (exitElem) {
  //           this.basketFilter.push();
  //         }
  //       });
  //     },
  //   });
  // }
}
