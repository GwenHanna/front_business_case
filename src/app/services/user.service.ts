import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserInterface } from '../entities/userInterface';
import { RegisterForm } from '../entities/registerForm';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;
  private userSubject = new BehaviorSubject<any>(null);
  public $user = this.userSubject.asObservable();

  /** User */

  getUser() {
    const userId = this.getUserInfo().id;
    if (userId) {
      this.fetchUserById(userId).subscribe({
        next: (data) => {
          this.userSubject.next(data);
        },
        complete: () => this.userSubject.subscribe((data) => console.log(data)),
      });
    } else {
      this.userSubject.next(null);
    }
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
  /** CRUD */
  upUserById(userId: number, body: UserInterface) {
    return this.http.patch(`${this.apiUrl}users/${userId}`, body);
  }

  fetchUserById(userId: string) {
    return this.http.get(`${this.apiUrl}users/${userId}`);
  }

  addUser(user: RegisterForm) {
    return this.http.post<RegisterForm>(`${this.apiUrl}users`, user);
  }
  removeUser(userId: string) {
    return this.http.delete(`${this.apiUrl}users/${userId}`);
  }
}
