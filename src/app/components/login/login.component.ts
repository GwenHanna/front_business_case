import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginForm } from '../../entities/loginForm';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formObservable$!: Observable<LoginForm>;
  messageErrorEmail = '';
  feedback: string = '';
  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe({
        next: (data) => {
          this.loginService.saveToken(data.token);
        },
        error: (error: HttpResponse<any>) => console.log(error),
        complete: () => {
          this.router.navigateByUrl('/');
          this.loginService.setIsLogged(true);
        },
      });
    }
  }
}
