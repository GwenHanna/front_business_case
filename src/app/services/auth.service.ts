import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../entities/registerForm';
import { Router } from '@angular/router';
import { TokenInterface } from '../entities/token';
import { LoginForm } from '../entities/loginForm';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged$: BehaviorSubject<boolean>;
  private isAdmin$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLogged$ = new BehaviorSubject<boolean>(
      !!localStorage.getItem('token')
    );
    this.isAdmin$ = new BehaviorSubject<boolean>(
      !!localStorage.getItem('roles')?.includes('ROLE_ADMIN')
    );
  }

  url = 'http://127.0.0.1:8000/api/';

  //** Observable sur le login plus sur les admins */
  getIsLogged(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
  setIsLogged(bool: boolean) {
    this.isLogged$.next(bool);
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }
  setIsAdmin(bool: boolean) {
    this.isAdmin$.next(bool);
  }

  /** User */
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
  checkAdminStatus() {
    const userInfo = this.getUserInfo();
    if (userInfo !== null) {
      return userInfo.roles.includes('ROLE_ADMIN');
    }
    return false;
  }

  add(user: RegisterForm) {
    return this.http.post<RegisterForm>(`${this.url}users`, user);
  }

  /** Connexion */
  login(credential: LoginForm) {
    return this.http.post<TokenInterface>(`${this.url}login_check`, credential);
  }
  /** Deconnexion */
  logout() {
    this.router.navigateByUrl('');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.isLogged$.next(false);
    this.isAdmin$.next(false);
  }

  /** Token */
  saveToken(token: string) {
    localStorage.setItem('token', token);
    const userInfo = this.getUserInfo();
    this.saveRoles(userInfo.roles);
    this.isAdmin$.next(userInfo.roles.includes('ROLE_ADMIN'));
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveRoles(roles: string) {
    localStorage.setItem('roles', roles);
  }
  getRole() {
    return localStorage.getItem('roles');
  }
}
