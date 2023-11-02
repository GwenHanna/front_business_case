import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentInterface } from '../entities/commentInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = 'http://localhost:8000/api/comments';
  private dataIsEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isEmpty$ = this.dataIsEmpty;
  constructor(private http: HttpClient) {}

  getCommentsPage(page: number) {
    const nbComments = 3;

    const params = new HttpParams().set('page', page.toString());
    this.http.get(this.url, { params }).subscribe({
      next: (data) => {
        console.log(data);

        if (data == false) {
          this.dataIsEmpty.next(true);
        }
      },
    });

    return this.http.get(this.url, { params });
  }
}
