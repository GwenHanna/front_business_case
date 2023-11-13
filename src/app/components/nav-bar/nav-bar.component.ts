import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { serviceInterface } from '../../entities/serviceInterface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;

  services: serviceInterface[] = [];
  categories: serviceInterface[] = [];

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggin();
    console.log(this.authService.getUserInfo());
    this.displayNavService();
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
