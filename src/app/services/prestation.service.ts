import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { selection } from '../models/selection';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  basketItem: selection[];
  private servicePrice!: number;
  private serviceName!: '';
  private storeBasket: any = localStorage.getItem('basket');
  private subjectBasket = new BehaviorSubject<selection[]>([]);

  constructor(
    private http: HttpClient,
    private serviceService: ServiceService
  ) {
    this.basketItem = JSON.parse(this.storeBasket) || [];
    this.updateBasket();
  }

  updateBasket() {
    this.subjectBasket.next(this.basketItem);
  }
  addPrestation(prestation: selection) {
    console.log(prestation);

    let existElem: selection | undefined = this.basketItem.find((item) => {
      console.log('item', item);
      return item.articleName === prestation.articleName;
    });

    if (existElem) {
      existElem.quantity = prestation.quantity;
    } else {
      this.basketItem.push(prestation);
    }

    localStorage.setItem('basket', JSON.stringify(this.basketItem));
    this.updateBasket();
  }

  getPrestation() {
    return this.subjectBasket.asObservable();
  }
}
