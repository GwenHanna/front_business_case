import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { selection } from '../models/selection';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  private servicePrice!: number;
  private serviceName!: '';

  constructor(
    private http: HttpClient,
    private serviceService: ServiceService
  ) {}
}
