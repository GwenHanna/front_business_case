import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/entities/userInterface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: UserInterface | undefined;
  selectUpDate: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.$user.subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.log(err),
    });
  }

  upDateAccount() {
    this.selectUpDate = !this.selectUpDate;
  }
  deletAccount() {
    if (this.user?.id) {
      const userIdAsString: string = '' + this.user.id;
      this.userService.removeUser(userIdAsString).subscribe({
        error: (err) => console.log(err),
        complete: () => {
          this.authService.logout();
          this.router.navigate(['/']);
        },
      });
    }
  }
}
