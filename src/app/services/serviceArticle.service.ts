import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { articleInterface } from '../entities/articleInterface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl: string = environment.apiUrl + 'services';
  private apiUrlService: string = environment.apiUrl;

  private subjectArticle = new BehaviorSubject<articleInterface[]>([]);
  public $articles = this.subjectArticle.asObservable();

  constructor(private http: HttpClient) {}

  getServiceUri(id: number) {
    this.fetchServiceByServiceType(id).subscribe({
      next: (data) => this.subjectArticle.next(data),
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchServiceByServiceType(id: number): Observable<any> {
    const url = `${this.apiUrlService}services/${id}/article`;
    return this.http.get(url);
  }

  getServices() {
    this.fetchAllArticle().subscribe({
      next: (articles) => this.subjectArticle.next(articles),
      error: (err) => console.log(err),
    });
  }

  // URL_API_ARTICLE = 'http://vps206.tyrolium.fr:2022/api/articles';

  fetchById(idArticle: string) {
    return this.http.get<articleInterface>(`${this.apiUrl}/${idArticle}`);
  }
  deleteArticle(idArticle: string) {
    return this.http.delete(`${this.apiUrl}/${idArticle}`);
  }

  fetchAllArticle() {
    return this.http.get<articleInterface[]>(this.apiUrl);
  }

  addArticle(article: articleInterface) {
    return this.http.post<articleInterface>(this.apiUrl, article);
  }
  upDateArticle(article: articleInterface) {
    return this.http.patch<articleInterface>(this.apiUrl, article);
  }
}
