import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../../entities/articleInterface';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { PrestationService } from 'src/app/services/prestation.service';

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
  public prestation: any;

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

    this.prestationService.prestation$.pipe(take(1)).subscribe({
      next: (prestation) => {
        console.log(prestation);
        // Utilisez les données de la prestation ici pour effectuer des opérations sur le panier
        // Vous pouvez également appeler d'autres méthodes du service basketService ici
      },
      error: (err) => console.log(err),
    });

    // this.prestationService.addPrestation(article);
    // let existElem = this.basket.find(
    //   (element: selection) => element.name === article.name
    // );
    // if (existElem) {
    //   existElem.quantity++;
    //   existElem.priceTotal =
    //     this.servicePrice + article.price * existElem.quantity;
    //   this.basketService.addPrestation(existElem);
    // } else {
    //   let newSelection = new selection(article.name, this.serviceName, 0, 1);
    //   newSelection.priceTotal = this.servicePrice + article.price * 1;
    //   this.basket.push(newSelection);
    //   this.basketService.addPrestation(newSelection);
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
