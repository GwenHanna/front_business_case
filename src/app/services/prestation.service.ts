import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  constructor(private http: HttpClient) {}

  fetchBy() {}
}
