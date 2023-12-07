import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { articleInterface } from '../entities/articleInterface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl: string = environment.apiUrl + 'articles/';

  constructor(private http: HttpClient) {}

  // URL_API_ARTICLE = 'http://vps206.tyrolium.fr:2022/api/articles';

  removeArticle(idArticle: string) {
    return this.http.delete(this.apiUrl + idArticle);
  }

  fetchAllArticle() {
    return this.http.get<articleInterface[]>(this.apiUrl);
  }

  addArticle(article: articleInterface) {
    console.log(this.apiUrl, article);

    return this.http.post<articleInterface>(this.apiUrl, article);
  }
  upDateArticle(article: articleInterface) {
    return this.http.patch<articleInterface>(this.apiUrl, article);
  }
}
