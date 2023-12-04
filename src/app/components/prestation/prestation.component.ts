import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { prestationInterface } from '../../entities/prestationsInterface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { articleInterface } from '../../entities/articleInterface';
import { Observable, map } from 'rxjs';
import { BasketInterface } from 'src/app/entities/basket-interface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { selection } from 'src/app/models/selection';
import { PrestationService } from 'src/app/services/prestation.service';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css'],
})
export class PrestationComponent implements OnInit {
  prestationsArticles: articleInterface[] = [];
  isLoading = false;
  serviceName = '';
  servicePrice!: number;
  idPrestation$ = new Observable();

  basket: selection[] = [];

  constructor(
    private serviceService: ServiceService,
    private prestationService: PrestationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.idPrestation$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );

    this.idPrestation$.subscribe({
      next: (data: any) => {
        this.prestationsArticles = [];
        this.refreashPrestation(data);
      },
    });
  }

  refreashPrestation(id: string) {
    this.serviceService.fetchByNameSercice(id).subscribe({
      next: (data) => {
        data.forEach((data) => {
          this.serviceName = data.service.name;
          this.servicePrice = data.service.price;
          this.prestationsArticles.push(data.article);
          this.isLoading = false;
        });
      },
      error: (err) => console.log(err),
    });
  }

  addPrestation(article: articleInterface) {
    let existElem = this.basket.find(
      (element: any) => element.articleName === article.name
    );
    if (existElem) {
      existElem.quantity++;
      existElem.priceTotal =
        this.servicePrice + article.price * existElem.quantity;
      this.prestationService.addPrestation(existElem);
    } else {
      let newSelection = new selection(article.name, this.serviceName, 0, 1);
      newSelection.priceTotal = this.servicePrice + article.price * 1;
      this.basket.push(newSelection);
      this.prestationService.addPrestation(newSelection);
    }
    console.log(existElem);
  }
}
