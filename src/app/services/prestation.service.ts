import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { selection } from '../models/selection';
import { ServiceTypeService } from './service-type.service';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  private servicePrice!: number;
  private serviceName!: '';
  private prestationSubject = new BehaviorSubject({});
  public prestation$ = this.prestationSubject.asObservable();
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    private serviceService: ServiceTypeService
  ) {}

  getPrestation() {
    this.fetchPrestationByquelquechose().subscribe({
      next: (prestation) => this.prestationSubject.next(prestation),
    });
  }

  fetchPrestationByquelquechose() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
    };

    return this.http.get(
      'http://localhost:8000/api/services/43/pricing',
      options
    );
  }
}
