import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { RegisterForm } from '../../entities/registerForm';
import { NavigateService } from '../../services/navigate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formObservable$: Observable<RegisterForm> | undefined;
  messageEmail = '';
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {
    this.authService.getIsAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data;
      },
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      plainPassword: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', [Validators.required]],
      gender: [''],
      street: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      roles: [''],
    });
  }

  onSubmit() {
    console.log(this.form.value.role);
    let formData: RegisterForm;

    if (this.form.valid) {
      if (this.isAdmin === false) {
        formData = {
          ...this.form.value,
          roles: ['ROLE_USER'],
        };
      } else {
        formData = {
          ...this.form.value,
        };
        console.log(formData);
      }
      this.userService.addUser(formData).subscribe({
        next: (data) => {
          console.log(data);

          this.navigateService.navigate('login');
        },
        error: (err) => {
          this.messageEmail = err.error.detail;
          console.log(err.error.detail);
        },
      });
      this.form.reset();
    }
  }
}
