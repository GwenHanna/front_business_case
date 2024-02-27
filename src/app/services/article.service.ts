import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { articleInterface } from '../entities/articleInterface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl: string = environment.apiUrl + 'articles';
  private subjectArticles = new BehaviorSubject<articleInterface[]>([]);
  public articles$: Observable<articleInterface[]> =
  this.subjectArticles.asObservable();

  constructor(private http: HttpClient) { }

  getArticles(){
    this.fetchAllArticles().subscribe({
      next: (data) => this.subjectArticles.next(data),
      error: (err) => console.log(err)
    })
  }

  fetchAllArticles(){
    return this.http.get<articleInterface[]>(this.apiUrl)
  }
}
