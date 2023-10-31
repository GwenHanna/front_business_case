import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  roles = '';
  isLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogin$.subscribe({
      next: (data) => {
        this.isLogin = data;
      },
    });
  }

  ngOnInit(): void {
    this.roles = this.authService.getRoleUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    // window.location.reload();
  }
}
