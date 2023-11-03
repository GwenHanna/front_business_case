import { Component, OnInit } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: serviceInterface[] = [];
  categories: {
    [key: string]: serviceInterface[];
  } = {};

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.displayService();
  }

  displayService() {
    this.serviceService.fetchAllService().subscribe({
      next: (data) => {
        this.services = data;
        this.services.forEach((data) => {
          if (this.categories[data.category] === undefined) {
            this.categories[data.category] = [];
          }
          this.categories[data.category].push(data);
        });
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
