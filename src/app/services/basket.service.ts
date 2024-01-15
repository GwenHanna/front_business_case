import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BasketDialogueComponent } from '../components/basket-dialogue/basket-dialogue.component';
import { BehaviorSubject } from 'rxjs';
import { selectionInterface } from '../entities/selectionInterface';
import { DataBasketInterface } from '../entities/dataBasketInterface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basket: selectionInterface[] = [];

  private storeBasket: any = localStorage.getItem('basket');
  private subjectStoreBasket = new BehaviorSubject<any>([]);
  stroreBasket$ = this.subjectStoreBasket.asObservable();

  private subjectBasket = new BehaviorSubject<selectionInterface[]>([]);
  basket$ = this.subjectBasket.asObservable();

  constructor(private dialoguService: DialogService) {
    this.basket = JSON.parse(this.storeBasket) || [];
    console.log('this.basket', this.basket);
    this.updateBasket();
  }

  // dataService(data: selectionInterface[]): DataBasketInterface[] {
  //   const newData: DataBasketInterface[] = [];
  //   data.forEach((el) => {
  //     for (let i = 0; i < el.quantity; i++) {
  //       newData.push({
  //         id: el.service.id,
  //         serviceName: el.service.name,
  //         state: '',
  //         note: '',
  //         repassage: false,
  //         price: el.service.price,
  //       });
  //     }
  //   });

  //   return newData;
  // }

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

  deleteBasket() {
    localStorage.removeItem('basket');
    this.basket = [];
    this.updateBasket();
  }

  getPrestation() {
    return this.subjectBasket.asObservable();
  }

  openModal(prestationData: any) {
    const ref = this.dialoguService.open(BasketDialogueComponent, {
      width: '25vw',
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
