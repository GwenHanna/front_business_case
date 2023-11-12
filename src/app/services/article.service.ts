import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { articleInterface } from '../entities/articleInterface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // URL_API_ARTICLE = 'http://vps206.tyrolium.fr:2022/api/articles';

  fetchAllArticle() {
    return this.http.get<articleInterface[]>(`${this.apiUrl}articles`);
  }
}
