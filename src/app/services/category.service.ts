import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categoryInterface } from '../entities/categoryInterface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // url = 'http://vps206.tyrolium.fr:2022/api/categories';
  private apiUrl: string = environment.apiUrl + 'categories';
  private categoriesSubject = new BehaviorSubject<categoryInterface[]>([]);
  public $categories: Observable<categoryInterface[]> =
    this.categoriesSubject.asObservable();
  constructor(private http: HttpClient) {}

  getCategories() {
    this.fetchAllCategory().subscribe({
      next: (data) => this.categoriesSubject.next(data),
    });
  }
  fetchById(idCategory: string) {
    return this.http.get<categoryInterface>(`${this.apiUrl}/${idCategory}`);
  }
  upDateArticle(article: categoryInterface) {
    return this.http.patch<categoryInterface>(this.apiUrl, article);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete<categoryInterface>(`${this.apiUrl}/${categoryId}`);
  }

  addCategory(name: categoryInterface) {
    return this.http.post<categoryInterface>(this.apiUrl, name);
  }
  fetchAllCategory() {
    return this.http.get<categoryInterface[]>(this.apiUrl);
  }
}
