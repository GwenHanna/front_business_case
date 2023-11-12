import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categoryInterface } from '../entities/categoryInterface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // url = 'http://vps206.tyrolium.fr:2022/api/categories';
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<categoryInterface[]>(`${this.apiUrl}categories`);
  }

  add(name: categoryInterface) {
    return this.http.post<categoryInterface>(`${this.apiUrl}categories`, name);
  }
}
