import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BasketInterface } from 'src/app/entities/basket-interface';
import { DataBasketInterface } from 'src/app/entities/dataBasketInterface';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { BasketService } from 'src/app/services/basket.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  baskets: DataBasketInterface[] = [];
  pricaTotal = 0;
  constructor(
    private basketService: BasketService,
    private serviceTypeService: ServiceTypeService
  ) {
    this.basketService.basket$.subscribe({
      next: (data) => {
        console.log('data', data);
        data.forEach((element) => {
          this.pricaTotal += element.priceTotal;
        });
        this.baskets = basketService.dataService(data);
        console.log('basket', this.baskets);
      },
      error: (err) => console.log('err', err),
    });
  }

  ngOnInit(): void {
    console.log(this.baskets);
  }
}
