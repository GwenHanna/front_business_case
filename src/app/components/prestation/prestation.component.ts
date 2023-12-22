import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../../entities/articleInterface';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { PrestationService } from 'src/app/services/prestation.service';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { selectionInterface } from 'src/app/entities/selectionInterface';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
})
export class PrestationComponent implements OnInit, OnDestroy {
  prestations: any = [];
  isLoading = false;
  servicePrice!: number;
  serviceName: string = '';
  idPrestation$ = new Observable();
  basket: selectionInterface[] = [];
  private destroy$ = new Subject<void>();
  public prestation: any;

  public priceTotal: number = 0;

  constructor(
    private articleService: ArticleService,
    private basketService: BasketService,
    private prestationService: PrestationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.idPrestation$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );

    this.idPrestation$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        this.refreashPrestation(data);
      },
    });
  }

  refreashPrestation(id: string) {
    this.articleService.getServiceUri(+id);
    this.articleService.$articles.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.prestations = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  addPrestation(article: articleInterface) {
    console.log(article);
    // Ajout de la quantity en dur pour test

    let existElem = this.basket.find((element) => {
      console.log(element);

      return element.service.id === article.id;
    });

    if (existElem) {
      let quantity = existElem.quantity++;
      this.basketService.addPrestationInLocalStorage(existElem);
      let articleId = '' + existElem.service.id;

      console.log('quantity', quantity);
      this.prestationService.refreashPricing(articleId, quantity);
      this.prestationService.prestation$.subscribe({
        next: (prestation: any) => {
          console.log(prestation);

          if (existElem && existElem.service.id == prestation.serviceId)
            existElem.priceTotal = prestation.priceTotal;
        },
        error: (err) => console.log(err),
      });
    } else {
      let newSelection: selectionInterface = {
        service: article,
        quantity: 1,
        priceTotal: article.price,
      };
      console.log('ok');

      this.basket.push(newSelection);
      this.basketService.addPrestationInLocalStorage(newSelection);
    }

    console.log(this.basket);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
