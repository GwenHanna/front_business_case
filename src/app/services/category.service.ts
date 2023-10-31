import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categoryInterface } from '../entities/categoryInterface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://127.0.0.1:8000/api/categories';
  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<categoryInterface[]>(this.url);
  }

  add(name: categoryInterface) {
    return this.http.post<categoryInterface>(this.url, name);
  }
}
