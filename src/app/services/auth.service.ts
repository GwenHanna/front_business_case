import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../entities/registerForm';
import { Router } from '@angular/router';
import { TokenInterface } from '../entities/token';
import { LoginForm } from '../entities/loginForm';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged$: BehaviorSubject<boolean>;
  private isAdmin$: BehaviorSubject<boolean>;
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.isLogged$ = new BehaviorSubject<boolean>(
      !!localStorage.getItem('token')
    );
    this.isAdmin$ = new BehaviorSubject<boolean>(
      !!localStorage.getItem('roles')?.includes('ROLE_ADMIN')
    );
  }

  // url = 'http://vps206.tyrolium.fr:2022/api';

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

  /** Connexion */
  login(credential: LoginForm) {
    return this.http.post<TokenInterface>(
      `${this.apiUrl}login_check`,
      credential
    );
  }
  /** Deconnexion */
  logout() {
    this.router.navigateByUrl('');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('basket');
    this.isLogged$.next(false);
    this.isAdmin$.next(false);
  }

  /** Token */
  saveToken(token: string) {
    localStorage.setItem('token', token);
    const userInfo = this.userService.getUserInfo();
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
