import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { articleInterface } from '../entities/articleInterface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  URL_API_ARTICLE = 'http://127.0.0.1:8000/api/articles';

  fetchAllArticle() {
    return this.http.get<articleInterface[]>(this.URL_API_ARTICLE);
  }
}
