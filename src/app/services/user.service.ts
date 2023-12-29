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

  private apiUrl: string = environment.apiUrl + 'users';
  private userSubject = new BehaviorSubject<any>(null);
  public $user = this.userSubject.asObservable();

  /** User */

  fetchUserByEmail(email: string) {
    return this.http.get(`${this.apiUrl}/?email=${email}`);
  }

  getUser() {
    const userEmail = this.getUserInfo().email;
    this.fetchUserByEmail(userEmail).subscribe({
      next: (data) => {
        console.log(data);

        this.userSubject.next(data);
      },
    });
    // console.log(userId);

    // if (userId) {
    //   this.fetchUserById(userId).subscribe({
    //     next: (data) => {
    //       this.userSubject.next(data);
    //       this.userSubject.subscribe((data) => console.log(data));
    //     },
    //   });
    // } else {
    //   this.userSubject.next(null);
    // }
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
    return this.http.patch(`${this.apiUrl}/${userId}`, body);
  }

  fetchUserById(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addUser(user: RegisterForm) {
    return this.http.post<RegisterForm>(this.apiUrl, user);
  }
  removeUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
