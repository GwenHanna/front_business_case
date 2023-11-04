import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';
import { prestationInterface } from '../entities/prestationsInterface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8000/api';

  fetchAllService() {
    return this.http.get<serviceInterface[]>(`${this.url}/services`);
  }
  fetchByCategoryService(category: string) {
    return this.http.get<serviceInterface[]>(
      `${this.url}/services?category=${category}`
    );
  }

  fetchByNameSercice(id: string) {
    return this.http.get<prestationInterface[]>(
      `${this.url}/prestations?service.id=${id}`
    );
  }
}
