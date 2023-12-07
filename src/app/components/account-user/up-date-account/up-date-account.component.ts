import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/entities/userInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-up-date-account',
  templateUrl: './up-date-account.component.html',
  styleUrls: ['./up-date-account.component.css'],
})
export class UpDateAccountComponent implements OnInit {
  @Input() user: UserInterface | undefined;

  form!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.user?.email],
      plainPassword: [this.user?.plainPassword],
      lastname: [this.user?.lastname],
      firstname: [this.user?.firstname],
      gender: [this.user?.gender],
      street: [this.user?.gender],
      zipcode: [this.user?.gender],
      city: [this.user?.city],
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.value) {
      this.upAccountUser();
    }
  }

  upAccountUser() {
    if (this.user?.id)
      this.userService.upUserById(this.user?.id, this.form.value).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
        complete: () => this.router.navigate(['/account']),
      });
  }
}
