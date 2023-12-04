import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { serviceInterface } from '../../entities/serviceInterface';
import { PrestationService } from 'src/app/services/prestation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [DialogService],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;

  services: serviceInterface[] = [];
  categories: serviceInterface[] = [];
  basket: selection[] = [];

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private router: Router,
    public dialogService: DialogService,
    private basketService: BasketService,
    private prestationService: PrestationService
  ) {}

  ngOnInit(): void {
    this.getLoggin();
    this.displayNavService();
  }

  getBasket() {
    this.prestationService.getPrestation().subscribe({
      next: (basket) => (this.basket = basket),
      error: (err) => console.log(err),
    });
  }

  openBasket(prestation: any) {
    this.basketService.openModal(prestation);
    this.getBasket();
  }

  getLoggin() {
    this.authService.getIsAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data;
        console.log('isAdmin' + data);
      },
      error: (err) => console.log(err + 'err'),
    });
    this.authService.getIsLogged().subscribe({
      next: (data) => {
        this.isLogin = data;
        console.log('isLoogin' + data);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  displayNavService() {
    this.serviceService.fetchAllCategoryService().subscribe({
      next: (data) => {
        this.categories = data.filter(
          (thing, i, arr) =>
            arr.findIndex((t) => t.category === thing.category) === i
        );
      },
    });
  }

  selectService(category: string) {
    this.serviceService.fetchByCategoryService(category).subscribe({
      next: (data) => {
        this.services = data;
      },
    });
  }
}
