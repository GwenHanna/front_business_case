import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BasketService } from 'src/app/services/basket.service';
import { SectionService } from 'src/app/services/section.service';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { UserService } from 'src/app/services/user.service';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { UserInterface } from 'src/app/entities/userInterface';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.css'],
})
export class NavBarMobileComponent implements OnInit {
  showDialogu() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }
  isAdmin: boolean = false;
  isLogin: boolean = false;
  user: UserInterface | undefined;

  sections: any;
  basket: selectionInterface[] = [];
  basketFilter: { [key: string]: { article: string; quantity: number }[] } = {};
  sectionActive: sectionInterface | null = null;

  // Variable Menu
  isToggleAccount: boolean = false;
  isToggleAccountAdmin: boolean = false;
  isToggleMenu: boolean = false;
  isToggleMenuAccount: boolean = false;
  visible: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogService: DialogService,
    private basketService: BasketService,
    private sectionService: SectionService,
    private userService: UserService
  ) {
    this.getLoggin();

    if (this.isLogin) {
      this.userService.getUser();
      this.userService.$user.subscribe({
        next: (data) => {
          return (this.user = data);
        },
      });
    }
  }

  ngOnInit(): void {
    this.refreashSectionService();
    this.getBasket();
  }

  refreashSectionService() {
    this.sectionService.getSection();
    this.sectionService.$section.subscribe({
      next: (data) => {
        // this.sections = data;
        this.sections = data.map((section) => ({
          ...section,
          isActive: false,
        }));
        console.log(this.sections);
      },
    });
  }

  // Basket
  getBasket() {
    return this.basketService.getPrestation().subscribe({
      next: (basket) => (this.basket = basket),
      error: (err) => console.log(err),
    });
  }

  openBasket() {
    this.basketService.openModal(this.basket);

    this.getBasket();
  }

  // Fonction de connexion
  getLoggin() {
    this.authService.getIsAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data;
      },
      error: (err) => console.log(err + 'err'),
    });
    this.authService.getIsLogged().subscribe({
      next: (data) => {
        this.isLogin = data;
      },
    });
  }

  login() {
    this.router.navigateByUrl('/login');
    this.toggleMenuCompte();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  // Fonction de selection
  selectService(serviceId: any) {
    this.router.navigateByUrl(`service/${serviceId}`);

    this.toggleMenu();
  }

  updateAccount() {
    this.router.navigateByUrl('/account');
    this.toggleMenuCompte();
  }

  // Fonction Evenement

  toggleMenu() {
    this.isToggleMenu = !this.isToggleMenu;
    console.log(this.isToggleMenu);
  }

  toggleMenuCompte() {
    this.isToggleMenuAccount = !this.isToggleMenuAccount;
  }

  onMenuSectionType(section: any) {
    this.sectionActive = section;
    section.isActive = true;
    console.log(section);
    console.log(this.sectionActive);
  }
  leaveMenuSectionType(section: any) {
    this.sectionActive = null;
    section.isActive = false;
  }

  onAccount(event: any) {
    let target = event.target.classList;
    if (target.contains('administration'))
      this.isToggleAccountAdmin = !this.isToggleAccountAdmin;
    if (target.contains('compte')) this.isToggleAccount = !this.isToggleAccount;
    console.log(target);
  }
  leaveAccount() {
    this.isToggleAccount = false;
    this.isToggleAccountAdmin = false;
  }
}
