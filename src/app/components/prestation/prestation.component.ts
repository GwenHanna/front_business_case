import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { PrestationService } from 'src/app/services/prestation.service';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { SectionService } from 'src/app/services/section.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
})
export class PrestationComponent implements OnInit, OnDestroy {
  // Type de prestation ????
  prestations: any = [];
  isLoading = false;
  serviceName: string | undefined = '';
  idPrestation$ = new Observable();
  // basket ? ou selectionBasket ??????????
  basket: selectionInterface[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private basketService: BasketService,
    private prestationService: PrestationService,
    private route: ActivatedRoute,
    private serviceTypeService: ServiceTypeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Récupération de l'ID du service_type dans l'url
    this.idPrestation$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );

    this.idPrestation$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        this.refreashPrestation(data);
        console.log('data', data);
        this.serviceTypeService.fetchById(data).subscribe({
          next: (service) => {
            this.serviceName = service.name;
          },
        });
      },
    });
  }

  refreashPrestation(id: string) {
    this.articleService.getServiceUri(+id);
    this.articleService.$serviceType.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.prestations = data;
        this.isLoading = false;
        console.log(this.basket);
        // console.log('dtestata', this.prestations.services);
      },
      error: (err) => console.log(err),
    });
  }

  addPrestation(articleService: serviceInterface) {
    this.prestationService.addPrestation(articleService);
  }

  deletePrestation(articleService: serviceInterface) {
    this.prestationService.decremantQuantity(articleService);
  }

  // UTILS
  // Récupérer la quantité en fonction du service
  getQuantityForArticleService(articleService: serviceInterface) {
    return this.prestationService.getQuantityForArticleService(articleService);
  }

  upDateQuantity = (event: any, article: serviceInterface) => {
    this.prestationService.upDateQuantity(event, article);
  };

  // Récupérer le prix total en fonction du service
  getPriceTotalForArticleService(articleService: serviceInterface) {
    return this.prestationService.getPriceTotalForArticleService(
      articleService
    );
  }

  // Desinscription
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
