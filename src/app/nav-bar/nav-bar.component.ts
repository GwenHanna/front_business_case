import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { serviceInterface } from '../entities/serviceInterface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;

  services: serviceInterface[] = [];

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggin();
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
        console.log(data);
      },
    });
  }
  encodeServiceName(name: string): string {
    return encodeURIComponent(name);
  }
}
