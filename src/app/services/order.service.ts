import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { OrdersInterface } from '../entities/orders-interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl + 'orders';

  getAllOrder() {
    return this.http.get<OrdersInterface[]>(this.apiUrl);
  }
}
