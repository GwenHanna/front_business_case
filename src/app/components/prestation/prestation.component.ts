import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../../entities/articleInterface';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';

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
  basket: selection[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private basketService: BasketService,
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
    console.log(id);
    this.articleService.getServiceUri(+id);
    this.articleService.$articles.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.prestations = data;

        console.log(this.prestations.services);
      },
      error: (err) => console.log(err),
    });
  }

  addPrestation(article: articleInterface) {
    // this.prestationService.addPrestation(article);
    let existElem = this.basket.find(
      (element: any) =>
        element.articleName === article.name &&
        element.serviceName === this.serviceName
    );
    if (existElem) {
      existElem.quantity++;
      existElem.priceTotal =
        this.servicePrice + article.price * existElem.quantity;
      this.basketService.addPrestation(existElem);
    } else {
      let newSelection = new selection(article.name, this.serviceName, 0, 1);
      newSelection.priceTotal = this.servicePrice + article.price * 1;
      this.basket.push(newSelection);
      this.basketService.addPrestation(newSelection);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
