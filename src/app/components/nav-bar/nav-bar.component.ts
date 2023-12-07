import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { serviceInterface } from '../../entities/serviceInterface';
import { PrestationService } from 'src/app/services/prestation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { selection } from 'src/app/models/selection';
import { BasketService } from 'src/app/services/basket.service';
import { UserInterface } from 'src/app/entities/userInterface';
import { SectionService } from 'src/app/services/section.service';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [DialogService],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;
  user: any;

  services: serviceInterface[] = [];
  sections: any = [];
  basket: selection[] = [];
  basketFilter: { [key: string]: { article: string; quantity: number }[] } = {};

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private router: Router,
    public dialogService: DialogService,
    private basketService: BasketService,
    private prestationService: PrestationService,
    private sectionService: SectionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.displayNavService();
    this.getLoggin();
    this.getBasket();
    if (this.isLogin) {
      this.userService.getUser();
    }
    this.userService.$user.subscribe({
      next: (data) => (this.user = data),
    });
  }

  displayNavService() {
    this.sectionService.fetchAllSection().subscribe({
      next: (data) => (this.sections = data),
    });
  }

  getBasket() {
    return this.basketService.getPrestation().subscribe({
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

  selectService(category: string) {
    this.serviceService.fetchByCategoryService(category).subscribe({
      next: (data) => {
        this.services = data;
      },
    });
  }
}
