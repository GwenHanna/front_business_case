import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8000/api/services';

  fetchAllService() {
    return this.http.get<serviceInterface[]>(this.url);
  }
}
