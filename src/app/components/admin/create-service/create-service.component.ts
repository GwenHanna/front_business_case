import { Component, OnInit } from '@angular/core';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})
export class CreateServiceComponent implements OnInit {
  constructor(private serviceService: ServiceService) {}

  services: serviceInterface[] = [];

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    this.serviceService.fetchAllService().subscribe({
      next: (services) => (this.services = services),
      error: (err) => console.log(err),
    });
  }
}
