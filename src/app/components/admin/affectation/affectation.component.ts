import { Component, OnInit } from '@angular/core';
import { OrdersInterface } from 'src/app/entities/orders-interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css'],
})
export class AffectationComponent implements OnInit {
  isLoading = false;
  orders: OrdersInterface[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.refreachOrder();
  }

  refreachOrder() {
    this.orderService.getAllOrder().subscribe({
      next: (order) => {
        this.orders = order;
        this.isLoading = false;
      },
    });
  }
}
