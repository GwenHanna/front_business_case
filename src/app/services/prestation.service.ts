import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { selectionInterface } from '../entities/selectionInterface';
import { serviceInterface } from '../entities/serviceInterface';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  time: number = 350;
  private prestationSubject = new BehaviorSubject({});
  public prestation$ = this.prestationSubject.asObservable();
  private basket: selectionInterface[] = [];
  private debounceId: any;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient, private basketService: BasketService) {
    basketService.getPrestation().subscribe({
      next: (data) => (this.basket = data),
    });
  }

  refreashPricing(idService: string, quantity: number) {
    this.operationPricing(idService, quantity).subscribe({
      next: (prestation) => this.prestationSubject.next(prestation),
    });
  }

  operationPricing(id: string, quantity: number) {
    const url = `http://localhost:8000/api/services/${id}/pricing?quantity=${quantity}`;
    return this.http.get(url);
  }
  getPriceTotalForArticleService(articleService: serviceInterface) {
    // console.log('articleService', articleService);
    if (this.basket && articleService && articleService.id) {
      const matchItemPriceTotal = this.basket.find((b: selectionInterface) => {
        // console.log('b', b);
        return b.service.id === articleService.id;
      });
      return matchItemPriceTotal ? matchItemPriceTotal.priceTotal : 0;
    }
    return 0;
  }

  getQuantityForArticleService(articleService: serviceInterface) {
    if (this.basket && articleService && articleService.id) {
      const matchItemQuantity = this.basket.find((b: selectionInterface) => {
        return b.service.id === articleService.id;
      });
      return matchItemQuantity ? matchItemQuantity.quantity : 0;
    }
    return 0;
  }

  decremantQuantity(articleService: serviceInterface) {
    let existElem = this.basket.find((element) => {
      return element.service.id === articleService.id;
    });

    if (existElem) {
      if (existElem.quantity > 0) {
        existElem.quantity--;
        this.basketService.addPrestationInLocalStorage(existElem);
        let articleId = '' + existElem.service.id;
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(() => {
          if (existElem) this.refreashPricing(articleId, existElem.quantity);
          this.prestation$.subscribe({
            next: (prestation: any) => {
              if (existElem && existElem.service.id == prestation.serviceId)
                existElem.priceTotal = prestation.priceTotal;
            },
            error: (err) => console.log(err),
          });
        }, this.time);
      }
    } else {
      return;
    }
  }

  upDateQuantity(event: any, article: serviceInterface) {
    let existElem = this.basket.find((element) => {
      // console.log('basket', element.quantity);
      return element.service.id === article.id;
    });

    if (existElem) {
      existElem.quantity = event;
      let articleId = '' + existElem.service.id;
      clearTimeout(this.debounceId);

      this.debounceId = setTimeout(() => {
        if (existElem) this.refreashPricing(articleId, existElem.quantity);
        this.prestation$.subscribe({
          next: (prestation: any) => {
            if (existElem && existElem.service.id == prestation.serviceId)
              existElem.priceTotal = prestation.priceTotal;
            if (existElem) {
              this.basketService.addPrestationInLocalStorage(existElem);
            }
          },
          error: (err) => console.log(err),
        });
      }, this.time);
    } else {
      let newSelection: selectionInterface = {
        service: article,
        quantity: 1,
        priceTotal: article.price,
      };

      this.basket.push(newSelection);
      this.basketService.addPrestationInLocalStorage(newSelection);
    }
  }

  addPrestation(article: serviceInterface) {
    let existElem = this.basket.find((element) => {
      // console.log('basket', this.basket);
      return element.service.id === article.id;
    });

    if (existElem) {
      existElem.quantity++;
      let articleId = '' + existElem.service.id;
      clearTimeout(this.debounceId);

      this.debounceId = setTimeout(() => {
        if (existElem) this.refreashPricing(articleId, existElem.quantity);
        this.prestation$.subscribe({
          next: (prestation: any) => {
            if (existElem && existElem.service.id == prestation.serviceId)
              existElem.priceTotal = prestation.priceTotal;
            if (existElem) {
              this.basketService.addPrestationInLocalStorage(existElem);
            }
          },
          error: (err) => console.log(err),
        });
      }, this.time);
    } else {
      let newSelection: selectionInterface = {
        service: article,
        quantity: 1,
        priceTotal: article.price,
      };

      this.basket.push(newSelection);
      this.basketService.addPrestationInLocalStorage(newSelection);
    }
  }
}
