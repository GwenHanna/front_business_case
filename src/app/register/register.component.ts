import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { RegisterForm } from '../entities/registerForm';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formObservable$: Observable<RegisterForm> | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {
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
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: RegisterForm = {
        ...this.form.value,
        roles: ['ROLE_USER'],
      };
      
      this.authService.add(formData).subscribe({
        next: (data) => {
          this.navigateService.navigate('login');
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.form.reset();
    }
  }
}
