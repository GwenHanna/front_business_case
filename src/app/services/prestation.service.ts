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

  refreashPricing(idService: string, quantity: number) {
    this.operationPricing(idService, quantity).subscribe({
      next: (prestation) => this.prestationSubject.next(prestation),
    });
  }

  operationPricing(id: string, quantity: number) {
    const url = `http://localhost:8000/api/services/${id}/pricing?quantity=${quantity}`;
    return this.http.get(url);
  }
}
