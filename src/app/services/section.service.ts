import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { sectionInterface } from '../entities/sectionInterface';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchAllSection() {
    return this.http.get<sectionInterface>(`${this.apiUrl}sections`);
  }
}
