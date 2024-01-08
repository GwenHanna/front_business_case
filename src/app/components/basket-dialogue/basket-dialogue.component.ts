import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { serviceTypesInterface } from 'src/app/entities/service_types';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-dialogue',
  templateUrl: './basket-dialogue.component.html',
  styleUrls: ['./basket-dialogue.component.css'],
})
export class BasketDialogueComponent implements OnInit {
  prestationData: selectionInterface[][] = [];
  servicesTypes: any;

  // Création d'un objet pour gérer l'affichage des services du basket en fonction du serviceType cliqué
  public stateMenuServiceTyype: { [key: string]: boolean } = {};

  constructor(private basketService: BasketService, private router: Router) {}

  ngOnInit(): void {
    this.basketService.getPrestation().subscribe({
      next: (data) => {
        console.log('this.prestationData', data);
        const test = data.reduce((acc: any, item) => {
          const serviceType = item.service.serviceType?.name;
          if (serviceType) {
            if (!acc[serviceType]) {
              acc[serviceType] = [];
            }

            acc[serviceType].push(item);

            return acc;
          }
        }, {});
        console.log('test', test);
        this.servicesTypes = Object.keys(test);
        this.prestationData = Object.values(test);
        console.log(this.servicesTypes);
        console.log(this.prestationData);
      },
      error: (err) => console.log('err', err),
    });
  }
  toggleMenuBasket(serviceType: string) {
    this.stateMenuServiceTyype[serviceType] =
      !this.stateMenuServiceTyype[serviceType];
    console.log(this.stateMenuServiceTyype[serviceType]);
  }
  emptyBasket() {
    console.log('prestationData', this.prestationData);
    this.basketService.deleteBasket();
  }

  submitBasket() {
    this.router.navigateByUrl('/basket');
  }
}
