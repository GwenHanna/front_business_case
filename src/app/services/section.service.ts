import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { sectionInterface } from '../entities/sectionInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private apiUrl: string = environment.apiUrl + 'sections';
  private sectionsSubject = new BehaviorSubject<sectionInterface[]>([]);
  public $section: Observable<sectionInterface[]> =
    this.sectionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getSection() {
    this.fetchAllSection().subscribe({
      next: (data) => this.sectionsSubject.next(data),
    });
  }
  fetchById(idCategory: string) {
    return this.http.get<sectionInterface>(`${this.apiUrl}/${idCategory}`);
  }
  fetchByName(nameService: string): Observable<any> {
    const url = `${this.apiUrl}?name=${nameService}`;
    return this.http.get<sectionInterface>(url);
  }

  upDateSection(article: sectionInterface, sectionId: number) {
    return this.http.patch<sectionInterface>(
      `${this.apiUrl}/${sectionId}`,
      article
    );
  }

  deleteSection(categoryId: number) {
    return this.http.delete<sectionInterface>(`${this.apiUrl}/${categoryId}`);
  }

  addSection(name: sectionInterface) {
    return this.http.post<sectionInterface>(this.apiUrl, name);
  }

  fetchAllSection() {
    return this.http.get<sectionInterface[]>(this.apiUrl);
  }
}
