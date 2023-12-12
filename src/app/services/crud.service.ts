import { Injectable } from '@angular/core';
import { articleInterface } from '../entities/articleInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor() {}

  subjectIsActiveArticle = new BehaviorSubject<boolean>(false);
  $isActiveArticles: Observable<boolean> =
    this.subjectIsActiveArticle.asObservable();

  subjectIsActiveServices = new BehaviorSubject<boolean>(false);
  $isActiveServices: Observable<boolean> =
    this.subjectIsActiveServices.asObservable();

  subjectIsActiveCategories = new BehaviorSubject<boolean>(false);
  $isActiveCategories: Observable<boolean> =
    this.subjectIsActiveCategories.asObservable();

  upDateActive(section: string) {
    switch (section) {
      case 'articles':
        this.subjectIsActiveArticle.next(!this.subjectIsActiveArticle.value);
        break;
      case 'services':
        this.subjectIsActiveServices.next(!this.subjectIsActiveServices.value);
        break;
      case 'categories':
        this.subjectIsActiveCategories.next(
          !this.subjectIsActiveCategories.value
        );
        break;
      default:
        break;
    }
  }
}
