import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../../entities/articleInterface';
import { Observable, map } from 'rxjs';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
})
export class PrestationComponent implements OnInit {
  prestations: any = [];
  isLoading = false;
  servicePrice!: number;
  serviceName: string = '';
  idPrestation$ = new Observable();
  basket: selection[] = [];

  constructor(
    private serviceService: ServiceService,
    private basketService: BasketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.idPrestation$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );

    this.idPrestation$.subscribe({
      next: (data: any) => {
        this.refreashPrestation(data);
      },
    });
  }

  refreashPrestation(id: string) {
    this.serviceService.fetchByNameSercice(id).subscribe({
      next: (data) => {
        this.prestations = data;
      },
      complete: () => {
        this.serviceName = this.prestations.name;
        this.isLoading = false;
        this.servicePrice = this.prestations.price;
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
}
