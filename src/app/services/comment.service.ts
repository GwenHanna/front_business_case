import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentInterface } from '../entities/commentInterface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  // url = 'http://vps206.tyrolium.fr:2022/api/comments';
  private dataIsEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isEmpty$ = this.dataIsEmpty;
  private apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getCommentsPage(page: number) {
    const nbComments = 3;

    const params = new HttpParams().set('page', page.toString());
    this.http.get(`${this.apiUrl}comments`, { params }).subscribe({
      next: (data) => {
        console.log(data);

        if (data == false) {
          this.dataIsEmpty.next(true);
        }
      },
    });

    return this.http.get(`${this.apiUrl}comments`, { params });
  }
}
