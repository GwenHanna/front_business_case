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
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from 'primeng/dialog';
import { BasketComponent } from '../../basket/basket.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [DialogService],
  animations: [
    trigger('fadeIn', [
      state('initial', style({ width: '0%' })),
      state('hovered', style({ width: '100%' })),
      transition('initial => hovered', [
        animate('700ms', style({ width: '100%' })),
      ]),
      transition('hovered => initial', [animate('1s', style({ width: '0%' }))]),
    ]),
    trigger('openClose', [
      state(
        'in-active',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'active',
        style({
          transform: 'translateY(100%)',
        })
      ),
      transition('in-active => active', [animate('900ms ease')]),
      transition('active => in-active', [animate('800ms ease-in')]),
    ]),
  ],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;
  user: UserInterface | undefined;

  sections: any;
  basket: selectionInterface[] = [];
  basketFilter: { [key: string]: { article: string; quantity: number }[] } = {};
  sectionActive: sectionInterface | null = null;

  // Variable Menu
  isToggleMenuAccount: boolean = false;
  isToggleAccountAdmin: boolean = false;

  animationState: string = 'in'; // Initial state


  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogService: DialogService,
    private basketService: BasketService,
    private sectionService: SectionService,
    private userService: UserService,
    private dialog:MatDialog
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

  getBasket() {
    return this.basketService.getPrestation().subscribe({
      next: (basket) => (this.basket = basket),
      error: (err) => console.log(err),
    });
  }

  openBasket() {
    this.basketService.openModal(this.basket);
    // this.dialog.open(BasketComponent, {
    //   width: '400px'
    // });

    this.getBasket();
  }

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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  // Fonction Evenement
  onMenuSectionType(section: any) {
    this.animationState = 'hovered';
    this.sectionActive = section;
    section.isActive = true;
    console.log(section);
    console.log(this.sectionActive);
  }
  leaveMenuSectionType(section: any) {
    this.animationState = 'initial';

    this.sectionActive = null;
    section.isActive = false;
  }
  onAccount(event: any) {
    let target = event.target.classList;
    console.log(target.contains('account'));
    
    console.log(this.isToggleAccountAdmin);
    console.log(this.isToggleMenuAccount);
    if (target.contains('administration'))
    this.isToggleAccountAdmin = true;
    if (target.contains('account'))
      this.isToggleMenuAccount = true;
    console.log(target);
  }
  leaveAccount() {
    this.isToggleMenuAccount = false;
    this.isToggleAccountAdmin = false;
  }
}
