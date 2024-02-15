import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { sectionInterface } from '../entities/sectionInterface';
import { BehaviorSubject, Observable, catchError, take, tap, throwError } from 'rxjs';
import { categoryInterface } from '../entities/categoryInterface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectServiceTypes } from '../store/selectors/service-type.selector';
import * as  SectionActions from '../store/actions/section.actions'
import { selectSection } from '../store/selectors/section.selector';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private apiUrl: string = environment.apiUrl + 'sections';
  private sectionsSubject = new BehaviorSubject<sectionInterface[]>([]);
  public $section: Observable<sectionInterface[]> =
    this.sectionsSubject.asObservable();
  token = localStorage.getItem('token');

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getSection() {
    this.store.select(selectSection).subscribe({
      next: (data) => {
        if (data !== undefined && data.length === 0) {
          console.log(data);
          this.fetchAllSection().subscribe({
            next: (sections) => {
              this.sectionsSubject.next(sections);
              this.store.dispatch(SectionActions.loadSection({ section: sections }))
            },
            error: (err) => console.log('section', err)
          });
        } else {
          this.sectionsSubject.next(data);
          console.log('SECTION', data);
        }
      },
      error: (err) => console.log('data', err)
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

  addSection(name: sectionInterface): Observable<sectionInterface> {
    return this.http.post(this.apiUrl, name)
  }

  fetchAllSection() {
    let options = {};
    if (this.token) {
      options = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      };
    }

    return this.http.get<sectionInterface[]>(this.apiUrl, options);
  }
}
