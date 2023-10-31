import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: { email: string; roles: string } | undefined;

  ngOnInit(): void {
    this.displayUser();
  }

  displayUser() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo !== null) {
      this.user = {
        email: userInfo.email,
        roles: userInfo.roles,
      };
    }
  }
}
