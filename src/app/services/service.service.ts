import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';
import { prestationInterface } from '../entities/prestationsInterface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // url = 'http://vps206.tyrolium.fr:2022/api';
  private apiUrl: string = environment.apiUrl;

  fetchAllService() {
    return this.http.get<serviceInterface[]>(`${this.apiUrl}services`);
  }

  fetchByCategoryService(category: string) {
    return this.http.get<serviceInterface[]>(
      `${this.apiUrl}services?category=${category}`
    );
  }

  fetchByNameSercice(id: string) {
    return this.http.get<prestationInterface>(`${this.apiUrl}services/${id}`);
  }
}
