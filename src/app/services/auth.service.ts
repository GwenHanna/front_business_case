import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../entities/registerForm';
import { Router } from '@angular/router';
import { TokenInterface } from '../entities/token';
import { LoginForm } from '../entities/loginForm';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private http: HttpClient, private router: Router) {}

  url = 'http://127.0.0.1:8000/api/';
  isLogin$ = this.isLogged;

  add(user: RegisterForm) {
    return this.http.post<RegisterForm>(`${this.url}users`, user);
  }

  login(credential: LoginForm) {
    return this.http.post<TokenInterface>(`${this.url}login_check`, credential);
  }

  logout() {
    this.router.navigateByUrl('');
    localStorage.removeItem('token');
    this.isLogin$.next(false);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const userInfo = JSON.parse(atob(base64));
      return userInfo;
    }
    return null;
  }

  getRoleUser() {
    const userInfo = this.getUserInfo();
    if (userInfo !== null) {
      return userInfo.roles;
    } else {
      return null;
    }
  }
}
