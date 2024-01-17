import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  user: { email: string; roles: string } | undefined;

  ngOnInit(): void {
    this.displayUser();
    this.getAdmin();
  }

  getAdmin() {
    this.authService.getIsAdmin().subscribe({
      next: (admin) => (this.isAdmin = admin),
    });
  }

  displayUser() {
    const userInfo = this.userService.getUserInfo();
    if (userInfo !== null) {
      this.user = {
        email: userInfo.email,
        roles: userInfo.roles,
      };
    }
  }
}
