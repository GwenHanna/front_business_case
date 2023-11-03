import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

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
}
